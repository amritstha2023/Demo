import mongoose from "mongoose";

async function connectDB(url){
     try {
        await mongoose.connect(url,{dbName:'InEase'})
        console.log("Database connected");
     } catch (error) {
        console.log(error)
     }
}

export default connectDB;
