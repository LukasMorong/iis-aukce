const router = require('express').Router();
const connectionPool = require('../connectionPool');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/auth.config');

//@route    GET api/admin/users
//@desc     get all users
//@access   Private, admin role(3)
router.get('/users', (req,res) => {
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

                    if(result[0].role !== 3){
                        res.json({
                            status: 403,
                            message: 'access denied'
                        })
                        connection.release();
                        return
                    }

                    connection.query(`SELECT * FROM users`, (err, result, fields) => {
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

//@route    GET api/admin/auctions
//@desc     get all auctions
//@access   Private, admin role(3)
router.get('/auctions', (req,res) => {
    let userId = 0
    let role = 0
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

                    if(result[0].role !== 3){
                        res.json({
                            status: 403,
                            message: 'access denied'
                        })
                        connection.release();
                        return
                    }

                    connection.query(`SELECT * FROM auctions`, (err, result, fields) => {
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

//@route    GET api/admin/auction/:id
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

                    if(result[0].role < 3){
                        res.json({
                            status: 403,
                            message: 'access denied'
                        })
                        connection.release();
                        return
                    }

                    connection.query(`DELETE FROM auctions WHERE id=${auctionId}`, (err, result, fields) => {
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