const router = require('express').Router();
const connectionPool = require('../connectionPool');

//@route    POST api/auction
//@desc     create auction
//@access   Private, role logged
router.post('/auction', (req,res) => {
    console.log(req.body)
    if(req.body.name && 
        req.body.transactionType &&
        req.body.auctionType &&
        req.body.description &&
        req.body.startingPrice &&
        req.body.startTime &&
        req.body.duration &&
        req.body.userId){


        const auctionData = {
            name: req.body.name,
            description: req.body.description,
            startTime: req.body.startTime,
            endTime: req.body.startTime + req.body.duration,                    //add valid duration
            minBid: req.body.transactionType === 'sell' ? req.body.startingPrice : 0,
            maxBid: req.body.transactionType === 'buy' ? req.body.startingPrice : 0,
            status: 'created',
            transactionType: req.body.transactionType,
            auctionType: req.body.auctionType,
            author: req.body.userId
        }

        connectionPool.getConnection((err, connection) => {
            connection.query(`INSERT INTO auctions (name, description, startTime, endTime, minBid, maxBid, status, transactionType, auctionType, author) 
                                VALUES('${auctionData.name}', '${auctionData.description}', '${auctionData.startTime}', '${auctionData.endTime}', '${auctionData.minBid}', '${auctionData.maxBid}', '${auctionData.status}', '${auctionData.transactionType}', '${auctionData.auctionType}', '${auctionData.author}');`, (err, result, fields) => {
                connection.release();
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
                    message: 'success'
                })
                return
            
            })
        })

    } else {
        res.json({
            status: 500,
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
            connection.release();
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
                message: 'success',
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
                connection.release();
                return
            }

            if(result.length == 0){
                res.json({
                    status: 403,
                    message: 'auction doesnt exist'
                })
                connection.release();
                return
            }


            connection.query(`DELETE FROM auctions WHERE id='${id}'`, (err, result, fields) => {
                connection.release();
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
                message: 'success'
            })
            return
        })
    })
});

//@route    GET api/auctions
//@desc     get active actions
//@access   Public
router.get('/auctions', (req,res) => {
    connectionPool.getConnection((err, connection) => {
        connection.query(`SELECT * FROM auctions WHERE status='approved'`, (err, result, fields) => {
            connection.release();
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
            connection.release();
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