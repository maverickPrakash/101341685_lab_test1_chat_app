const { default: mongoose } = require("mongoose");

const messages = mongoose.Schema({
    username:{
        type:String,
        require:["Please enter the name"]
    },
    
    message:{
        type:String,
        require:["Please enter the message"]
    },
    
    category:{
        type:String,
        require:["Please enter the categoty of message"]
    }

})

const message = messages.model('messages', messages);
module.exports = message