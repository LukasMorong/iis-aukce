const router = require('express').Router();


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