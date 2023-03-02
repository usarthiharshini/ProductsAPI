
const express = require('express');
const router = require('./routes')
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

mongoose.connect(process.env.MONGO,{
    useNewUrlParser: true
})/* .then(()=>{
    console.log("connected successfully")
})
console.log(process.env.MONGO) */
const db = mongoose.connection
db.on('error',()=>console.log("error"))
db.once('open',()=>{
    console.log("db connection")
})


const PORT = process.env.PORT || 8008
app.use('/',router)

app.listen(PORT,()=>{
    console.log("server listening on port",PORT);
})
