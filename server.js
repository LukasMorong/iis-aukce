const express = require('express');
const routes = require('./routes/routes.js');

const app = express();

//router
app.use('/api', routes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('listening on ' + port)
})