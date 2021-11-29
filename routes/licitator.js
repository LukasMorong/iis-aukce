const router = require('express').Router();
const connectionPool = require('../connectionPool');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/auth.config');

//@route    GET api/licitator/licitations
//@desc     get all users licitations
//@access   Private, min licitator role(2)
router.get('/licitations', (req,res) => {
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

                    connection.query(`SELECT * FROM licitations WHERE userID='${auth.id}'`, (err, result, fields) => {
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

//@route    GET api/licitator/requests
//@desc     get all licitation requests
//@access   Private, min licitator role(2)
router.get('/requests', (req,res) => {
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

                    if(result[0].role < 2){
                        res.json({
                            status: 403,
                            message: 'access denied'
                        })
                        connection.release();
                        return
                    }

                    connection.query(`SELECT * FROM auctions WHERE status='created'`, (err, result, fields) => {
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

//@route    GET api/licitator/licitate
//@desc     take responsibility of auction
//@access   Private, min licitator role(2)
router.post('/licitate', (req,res) => {
    if(
        !(req.body.userId) ||
        !(req.body.auctionId)
    ) {
        res.json({
            status: 500,
            message: 'invalid data'
        })
        return
    }
    
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

                    if(result[0].role < 2){
                        res.json({
                            status: 403,
                            message: 'access denied'
                        })
                        connection.release();
                        return
                    }

                    connection.query(`UPDATE auctions SET status='approved', manager=${auth.id} WHERE id=${req.body.auctionId} AND status='created'`, (err, result, fields) => {
                        console.log(result)
                        if(err){
                            res.json({
                                status: 500,
                                message: 'database error'
                            })
                            connection.release()
                            return
                        }

                        res.json({
                            status: 200,
                            message: 'success'
                        })
                        connection.release()
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