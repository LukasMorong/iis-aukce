const router = require('express').Router();
const connectionPool = require('../connectionPool');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/auth.config');

//@route    GET api/user/auctions
//@desc     get all users auctions
//@access   Private, min licitator role(1)
router.get('/auctions', (req,res) => {
    const token = req.cookies.auth

    if(token){
        jwt.verify(token, jwtSecret.secret, (err, auth) => {
            connectionPool.getConnection((err, connection) => {
                connection.query(`SELECT role FROM users WHERE id=${auth.id}`, (err, result, fields) => {
                    if(err){
                        res.json({
                            status: 500,
                            message: 'database error'
                        })
                        connection.release();
                        return
                    }

                    if(result[0].role < 1){
                        res.json({
                            status: 403,
                            message: 'access denied'
                        })
                        connection.release();
                        return
                    }

                    connection.query(`SELECT * FROM auctions WHERE author='${auth.id}'`, (err, result, fields) => {
                        connection.release()

                        if(err){
                            res.json({
                                status: 500,
                                message: 'database error'
                            })
                            return
                        }

                        res.json({
                            status: 200,
                            message: 'sucess',
                            data: result
                        })
                        return

                    })
                })
            })
        })
    } else {
        res.json({
            status: 403,
            message: 'access denied',
        })
    }
});

//@route    GET api/user/auction/:id
//@desc     get all users auctions
//@access   Private, min licitator role(1)
router.delete('/auction/:id', (req,res) => {
    const auctionId = parseInt(req.params.id)
    const token = req.cookies.auth

    if(token){
        jwt.verify(token, jwtSecret.secret, (err, auth) => {
            connectionPool.getConnection((err, connection) => {
                connection.query(`SELECT role FROM users WHERE id=${auth.id}`, (err, result, fields) => {
                    if(err){
                        res.json({
                            status: 500,
                            message: 'database error'
                        })
                        connection.release();
                        return
                    }

                    if(result[0].role < 1){
                        res.json({
                            status: 403,
                            message: 'access denied'
                        })
                        connection.release();
                        return
                    }

                    connection.query(`DELETE FROM auctions WHERE id=${auctionId} AND author=${auth.id}`, (err, result, fields) => {
                        connection.release()

                        if(err){
                            res.json({
                                status: 500,
                                message: 'database error'
                            })
                            return
                        }

                        res.json({
                            status: 200,
                            message: 'sucess'
                        })
                        return

                    })
                })
            })
        })
    } else {
        res.json({
            status: 403,
            message: 'access denied',
        })
    }
});


module.exports = router;