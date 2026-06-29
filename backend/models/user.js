//schema blue print of the data. how you are going to store

const mongoose = require("mongoose")

const validator = require("validator")

const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")

const crypto = require("crypto")
const { use } = require("react")

//step 2 create schema

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"please enter your name"],
        maxlength:[30,"Nmae cannot exeed 30 characters"]
    },
    email:{
        type: String,
        required: [true,"please enter emailid"],
        unique:[true],
        lowercase: true,
        validate:[validator.isEmail,"Enter valid email."]
    },
    password:{
        type: String,
        required: [true,"Enter password"],
        minlength:8,
        select:false

    },
    passwordConfirm:{
        type: String,
        required: [true,"Confirm password"],
        validate:{
            validator: function(el){
                return el=== this.password
            },
            message:"passwords are not same"
        }

    },
    phoneNumber:{
        type: String,
        required:true,
        match:[/^[0-9]{10}$/, "Enter valid phone number"] 
    },
    role:{
        type: String,
        enum: ["user","admin"],
        default:"user"
    },
    avatar:{
        public_id:String,
        url: String
    },
    passwodChangedAt: Date,
    passwordResetToken:String,
    passwordResetExpires:Date



},
{timestamp:true}
);

//hash password
//pre("save")=>runs before data is saved

userSchema.pre("save", async function(){
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password,12)
    this.passwordConfirm = undefined
})

//pasword compare
userSchema.methods.correctPassword = async function(
    candidatePassword,userPassword){
        return await bcrypt.compare(candidatePassword,userPassword)
    }

//checks whether the users password was changed after getting jwt token
//if yes , the old token is invalid nd user must login again


userSchema.methods.changedPasswordAfter=function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimestampn= parseInt(
            this.passwodChangedAt.getTime()/1000,10
        )
        return JWTTimestamp <changedTimestampn
    }
    return false;
}

//custom method to generate jwt token

userSchema.methods.getJWTToken = function(){
    return jwt.sign(
        {id:this._id},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES}


    )
}

module.exports = mongoose.model("User",userSchema)
