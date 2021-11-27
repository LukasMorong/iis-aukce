const router = require('express').Router();
const connectionPool = require('../connectionPool');


//test user - admin
adminUser = {
    username: "karban",
    password: "linux"
}

var session

//@route    GET api/test
//@desc     Tests api
//@access   Public
router.get('/test', (req,res) => {
    res.json({
        status: 200,
        message: 'it works :)'
    })
});

router.get('/user', (req,res) => {
    console.log(req.sessionID)
    if(session?.id == req.sessionID){
        res.json({
            status: 200,
            user: {
                username: session.name
            }
        })
    } else {
        res.json({
            status: 400,
            message: 'please log in'
        })
    }
})

//@route    POST api/register
//@desc     user register
//@access   Public
router.post('/register', (req,res) => {
    if(req.body.email && req.body.password){
        const userData = {
            email: req.body.email,
            password: req.body.password
        }

        connectionPool.getConnection((err, connection) => {
            connection.query(`SELECT * FROM users 
                                WHERE email='${userData.email}'`, (err, result, fields) => {
                if(err){
                res.json({
                    status: 500,
                    message: 'database error'
                })
                return
            }

            if(result.length != 0){
                res.json({
                    status: 403,
                    message: 'user already exists'
                })
                return
            }

            connection.query(`INSERT INTO users (firstname, lastname, email, password) 
                        VALUES ('${'Meno'}', '${'Priezvisko'}', '${userData.email}', '${userData.password}');`, (err, result) => {
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

    } else {
        res.json({
            status: 500,
            message: 'invalid data'
        })
    }
});

//@route    POST api/login
//@desc     user login
//@access   Public
router.post('/login', (req,res) => {
    if(req.body.username == adminUser.username && req.body.password == adminUser.password){
        session = req.session
        session.name = adminUser.username
        res.json({
            status: 200,
            message: 'ajtaku'
        })
    } else {
        res.json({
            status: 400,
            message: 'ajeje'
        })
    }
});

module.exports = router;