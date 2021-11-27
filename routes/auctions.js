const router = require('express').Router();
const connectionPool = require('../connectionPool');

//@route    POST api/auction
//@desc     create auction
//@access   Private, role logged
router.post('/auction', (req,res) => {

    if(req.body.name && 
        req.body.category &&
        req.body.type &&
        req.body.rule &&
        req.body.startingPrice &&
        req.body.description){


        const auctionData = {
            name: req.body.name,
            category: req.body.category,
            type: req.body.type,
            rule: req.body.rule,
            startingPrice: parseInt(req.body.startingPrice),
            description: req.body.description
        }

        connectionPool.getConnection((err, connection) => {
            connection.query(`INSERT INTO auctions (name, category, type, rule, startingPrice, hiloBid, description) 
                                VALUES('${auctionData.name}', '${auctionData.category}', '${auctionData.type}', '${auctionData.rule}', '${auctionData.startingPrice}', '${0}', '${auctionData.description}');`, (err, result, fields) => {
                if(err){
                    console.log(err)
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

    } else {
        res.json({
            status: 400,
            message: 'invalid data'
        })
    }
});

//@route    GET api/auction/:id
//@desc     get action data by ID
//@access   Public
router.get('/auction/:id', (req,res) => {
    const id = parseInt(req.params.id)

    connectionPool.getConnection((err, connection) => {
        connection.query(`SELECT * FROM auctions WHERE id='${id}'`, (err, result, fields) => {
            if(err){
                console.log(err)
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
});

//@route    DELETE api/auction/:id
//@desc     delete auctions by id
//@access   Private, role logged + owner, or higher
router.delete('/auction/:id', (req,res) => {
    const id = parseInt(req.params.id)

    connectionPool.getConnection((err, connection) => {
        connection.query(`SELECT * FROM auctions WHERE id='${id}'`, (err, result, fields) => {
            if(err){
                console.log(err)
                res.json({
                    status: 500,
                    message: 'database error'
                })
                return
            }

            if(result.length == 0){
                res.json({
                    status: 403,
                    message: 'auction doesnt exist'
                })
                return
            }


            connection.query(`DELETE FROM auctions WHERE id='${id}'`, (err, result, fields) => {
                if(err){
                    console.log(err)
                    res.json({
                        status: 500,
                        message: 'database error'
                    })
                    return
                }


            })

            res.json({
                status: 200,
                message: 'sucess'
            })
            return
        })
    })
});

//@route    GET api/auctions
//@desc     get actions
//@access   Public
router.get('/auctions', (req,res) => {
    connectionPool.getConnection((err, connection) => {
        connection.query(`SELECT * FROM auctions`, (err, result, fields) => {
            if(err){
                console.log(err)
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
});

//@route    GET api/auctions/:category
//@desc     get actions by category
//@access   Public
router.get('/auctions/:category', (req,res) => {
    const category = req.params.category

    connectionPool.getConnection((err, connection) => {
        connection.query(`SELECT * FROM auctions WHERE category='${category}'`, (err, result, fields) => {
            if(err){
                console.log(err)
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
});

module.exports = router;