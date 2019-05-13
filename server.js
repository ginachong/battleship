const mongoose = require ('mongoose')
const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const expressJwt = require('express-jwt')
const PORT = process.env.port || 7000

//middleware here
app.use(express.json())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use("/api", expressJwt({secret: process.env.SECRET})) // gives req.user

//connect to the db
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://localhost:27017/database",
    { 
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true 
    },
    (err) => {
        if(err) throw err;
        console.log('Connected to the DB')
    }
)

//connect to routes
app.use('/auth', require('./routes/auth'))

//error handler
app.use((err, req, res, next) => {
    console.error(err);
    if (err.name === "UnauthorizedError") {
        // express-jwt gives the 401 status to the err object for us
        res.status(err.status);
    }
    return res.send({ message: err.message });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})