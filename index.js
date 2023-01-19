const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

require('dotenv').config()
 
app.use(express.json());



app.use(cors({
  origin: '*'
}));


mongoose.connect(process.env.MONGODB).then(()=>console.log("Database is connected"))

app.use("/",(req,res)=>{
  res.send("*********Welcome to booking API********")
})
