
const express = require('express');
const router = require('./routes')
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();



const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      
    }
  }


const PORT = process.env.PORT || 8008

app.use('/',router)

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("server listening on port",PORT);
    })
})

