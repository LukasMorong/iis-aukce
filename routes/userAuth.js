const router = require('express').Router();
const connectionPool = require('../connectionPool');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcryptjs');
const jwtSecret = require('../config/auth.config');


//@route    GET api/test
//@desc     Tests api
//@access   Public
router.get('/test', (req,res) => {
    res.json({
        status: 200,
        message: 'it works :)'
    })
});

router.get('/currentUser', (req,res) => {
    let userId = 0
    let role = 0
    const token = req.cookies.auth

    if(token){
        jwt.verify(token, jwtSecret.secret, (err, auth) => {
            connectionPool.getConnection((err, connection) => {
                connection.query(`SELECT * FROM users WHERE id=${auth.id}`, (err, result, fields) => {
                    connection.release();
                    if(err){
                        res.json({
                            status: 500,
                            message: 'database error'
                        })
                        return
                    }


                    res.json({
                        status: 200,
                        message: 'success',
                        data: {
                            email: auth.email,
                            userId: auth.id,
                            role: result[0].role,
                            firstName: result[0].firstname,
                            lastName: result[0].lastname

                        }
                    })
                })
            })
        })
    } else {
        res.json({
            status: 200,
            message: 'success',
            data: {
                email: 'not logged',
                userId: userId,
                role: role
            }
        })
    }
})

//@route    POST api/register
//@desc     user register
//@access   Public
router.post('/register', (req,res) => {
    if(req.body.email && req.body.password){
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) throw err;
                const userData = {
                    firstName: (req.body.firstName ? req.body.firstName : ''),
                    lastName: (req.body.lastName ? req.body.lastName : ''),
                    email: req.body.email,
                    password: hash
                }

                connectionPool.getConnection((err, connection) => {
                    connection.query(`SELECT * FROM users 
                                        WHERE email='${userData.email}'`, (err, result, fields) => {
                        if(err){
                            res.json({
                                status: 500,
                                message: 'database error'
                            })
                            connection.release();
                            return
                        }
        
                        if(result.length != 0){
                            res.json({
                                status: 403,
                                message: 'user already exists'
                            })
                            connection.release();
                            return
                        }
            
                        connection.query(`INSERT INTO users (firstname, lastname, email, password, role) 
                                    VALUES ('${userData.firstName}', '${userData.lastName}', '${userData.email}', '${userData.password}', '${1}');`, (err, result) => {
                            connection.release();
                            if(err){
                                res.json({
                                    status: 500,
                                    message: 'database error'
                                }) 
                                return
                            }
        
                            res.json({
                                status: 200,
                                message: 'success'
                            })
                            return
                        })
                    })
                })

            });
        });

    } else {
        res.json({
            status: 400,
            message: 'invalid data'
        })
    }
});

//@route    POST api/login
//@desc     user login
//@access   Public
router.post('/login', (req,res) => {
    if(req.body.email && 
        req.body.password){

            const userData = {
                email: req.body.email,
                password: req.body.password
            }
        
            connectionPool.getConnection((err, connection) => {
                connection.query(`SELECT * FROM users WHERE email='${userData.email}'`, (err, result, fields) => {
                    connection.release();
                    if(err){
                        res.json({
                            status: 500,
                            message: 'database error'
                        })
                        return
                    }

                    if(result.length == 1){
                        const hashedPassword = result[0].password
                        const userId = result[0].id


                        bcrypt.compare(userData.password, hashedPassword, (err, result) => {
                            if(!err && result){

                                const payload = { id: userId, email: userData.email }
                                const token = jwt.sign(payload, jwtSecret.secret, { expiresIn: 3600 })
                                res.cookie('auth', token,{ maxAge: 3600000 })
                                res.json({
                                    status: 200,
                                    message: 'login success',
                                })
                                return
                            } else {
                                res.json({
                                    status: 401,
                                    message: 'wrong password'
                                })
                                return
                            }
                        })
                    } else {
                        res.json({
                            status: 401,
                            message: 'user not found'
                        })
                        return
                    }
                })
            })

    } else {
        res.json({
            status: 400,
            message: 'invalid data'
        })
    }
});

module.exports = router;