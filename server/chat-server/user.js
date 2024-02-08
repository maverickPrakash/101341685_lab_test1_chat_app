const { default: mongoose } = require("mongoose");

const users = mongoose.Schema({
    username:{
        type:String,
        required:["Please enter the username"],
        unique:true
       
    },
    firstname:{
        type:String,
        required:["Please enter the firstname"],
        lowercase: true
    },
    lastname:{
    type:String,
        required:["Please enter the lastname"],
        lowercase: true
    },
    password:{
        type:String,
        required:["Please enter the password"]
        
    },
    create_on:{
        type:String,
        required:["Please enter the date it is create on"]
    }

    
})
const user = mongoose.model("users", users);
module.exports = user;