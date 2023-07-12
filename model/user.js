import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
       type:String,
       required:true,
       unique:true
    },
    password:{
        type:String,
        required:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    usertype:{
        type:String,
        required:true
    }
})

userSchema.pre("save", async function (next) {
    const user = this;
    const existingUser = await mongoose.models.userCollection.findOne({
        $or: [
            { email: user.email },
            { username: user.username }
        ]
    });

    if (existingUser) {
        const field = existingUser.email === user.email ? "email" : "username";
        const errorMessage = `The ${field} is already registered.`;
        return next(new Error(errorMessage));
    }

    next();
});

const userCollection=mongoose.model('userCollection',userSchema);

export default userCollection;