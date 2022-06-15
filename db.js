const mongoose = require('mongoose');

// const MongoUri = "mongodb://localhost:27017/React-assignment"

require('dotenv').config();

const connectToMongo = () =>{
    mongoose.connect(process.env.MongoUri,()=>{
        console.log("Mongo Db connection Success!")
    })
}

module.exports = connectToMongo;