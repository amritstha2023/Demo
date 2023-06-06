import express, { urlencoded } from 'express'
import dotenv from 'dotenv';
import connectDB from './config/Database/connectDB.js';
import web from './routes/web.js';
dotenv.config();

let app=express();

app.use(urlencoded({extended:false}))
app.use(express.json())


connectDB(process.env.MONGO_URL);


//config routes
app.use('/api',web)

app.use((err,req,res,next)=>{
     return res.json({message:err.stack})
})


app.listen(process.env.APP_PORT,()=>{
    console.log(`ServerRunning at port ${process.env.APP_PORT} `)
})


