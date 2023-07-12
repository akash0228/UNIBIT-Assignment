import userCollection from "../model/user.js";
import bcrypt from 'bcrypt';
import pkg  from "jsonwebtoken";

const secretKey=process.env.SECRET_KEY || "secretkey";

export const registerUser=(req,res)=>{
     const username=req.body.username;
     const password=req.body.password;
     const email=req.body.email;
     const phonenumber=req.body.phonenumber;
     const usertype=req.body.usertype;
     bcrypt.hash(password,10,async(error,hash)=>{
        if(error){
           return res.status(500).json(error.message);
        }
        else{
            try{
                const newUser=await userCollection.create({
                    username:username,
                    password:hash,
                    email:email,
                    phonenumber:phonenumber,
                    usertype:usertype
                })

                await newUser.save();
                return res.status(200).json(newUser);
            }catch(error){
                return res.status(500).json(error.message);
            }
        }
     })
}

export const login=async(req,res)=>{
    try{
        const username=req.body.username;
        const password=req.body.password;

        const user= await userCollection.find({username:username});
        if(user.length<1){
            return res.status(401).json("user not exist");
        }
        else{
            bcrypt.compare(password,user[0].password,(error,result)=>{
                if(!result){
                    res.status(401).json("password doesnot macth");
                }
                else{
                    const token=pkg.sign({
                        username:user[0].username,
                        usertype:user[0].usertype,
                        email:user[0].email,
                        phonenumber:user[0].phonenumber
                    },secretKey,{expiresIn:"24h"});

                   return res.status(200).json({
                    user:user[0].username,
                    email:user[0].email,
                    phonenumber:user[0].phonenumber,
                    token:token
                   });
                }
            })
        }
    }catch(error){
        return res.status(500).json(error.message);
    }
}
