//schema blue print of the data. how you are going to store

const mongoose = require("mongoose")

const validator = require("validator")

const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")

const crypto = require("crypto")

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
    }

})