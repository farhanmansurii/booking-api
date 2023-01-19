const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

require('dotenv').config()
 
app.use(express.json());



app.use(cors({
  origin: '*'
}));

app.listen(process.env.PORT,()=>{
  console.log(`${process.env.PORT} is listening `)
})
mongoose.connect(process.env.MONGODB).then(()=>console.log("Database is connected"))

app.use("/",(req,res)=>{
  res.send("*********Welcome to booking API********")
})
