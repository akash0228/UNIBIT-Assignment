import  express,{json, urlencoded } from "express";
import cors from 'cors';
import route from "./routes/routes.js";
import connection from "./db/conn.js";

const app=express();

app.use(cors());

app.use(json({extended:true}));
app.use(urlencoded({extended:true}));

const PORT=process.env.PORT||5000;

app.use('/',route);

connection();

app.listen(PORT,()=>{
    console.log(`Server is Running on Port ${PORT} Successfully`);
})