const express = require('express');
const routes = require('./routes/routes.js');
const sessions = require('express-session');
const cookieParser = require("cookie-parser");
const cors = require('cors');

const app = express();

//parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsConfig = {
    origin: true,
    credentials: true,
  };
  
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));


//sessions
const oneDay = 1000 * 60 * 60 * 24;             //cookie expiration
app.use(sessions({
    secret: "MilujemeVasPanMeciar!!!",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

//router
app.use('/api', routes);

//ready to run
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('listening on ' + port)
})