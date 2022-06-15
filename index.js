const connectToMongo = require('./db')
var express = require('express');
var cors = require("cors")

connectToMongo();

var app = express();

const port = 5000

app.use(express.json())

app.use(cors())


// available routes

app.use('/api/auth', require('./Routes/auth.js'))
app.use('/api/form', require('./Routes/form.js'))
// app.use('/api/getclients', require('./Routes/clients.js'))

app.get('/', function (req, res) {
    res.send("Hello world")
});

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});