const express = require('express')
const cookieParser = require("cookie-parser")
const cors = require('cors')

const userAuth = require('./routes/userAuth.js')
const auctions = require('./routes/auctions.js')
const adminRoutes = require('./routes/admin.js')
const licitatorRoutes = require('./routes/licitator.js')
const userRoutes = require('./routes/user.js')

const app = express()

//parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const corsConfig = {
    origin: true,
    credentials: true,
  }
  
app.use(cors(corsConfig))
app.options('*', cors(corsConfig))

//router
app.use('/api', userAuth)
app.use('/api', auctions)
app.use('/api/admin', adminRoutes)
app.use('/api/licitator', licitatorRoutes)
app.use('/api/user', userRoutes)

//ready to run
const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log('listening on ' + port)
})