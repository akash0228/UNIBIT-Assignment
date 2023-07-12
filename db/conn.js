import mongoose from "mongoose";
const DB_URL="mongodb://127.0.0.1:27017/Unibit";

const connection=()=>{
    mongoose.connect(DB_URL);

    mongoose.connection.on('connected',()=>{
        console.log("Database connected");
    })

    mongoose.connection.on('diconnected',()=>{
        console.log("Database disconnected");
     })

     mongoose.connection.on('error',()=>{
        console.log('Error while connecting with database');
     })
}

export default connection;