const users = require("../chat-server/user")
const express = require('express')
const userModel = require("../chat-server/user")
const app = express()
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            throw new Error("Username and password are required");
        }

        const loginUser = await userModel.findOne({ username });

        if (!loginUser) {
            throw new Error("User not found");
        }

        
        if (password!=loginUser.password) {
   
            throw new Error("Incorrect password");
        }

        res.json(loginUser);
    } catch (err) {
        res.status(500).send(err.message);
    }


})
app.post('/signup' ,async (req,res)=>{
    try{
        const existUser = await  userModel.findOne({username:req.body.username})
        if(existUser){

            console.log(existUser)
            throw new Error("The user already Exist");
        }
        const user = new userModel(req.body)
        
        await user.save()
        res.send("Register sucessfully")

    }catch(err){
        res.status(501).send(err.message)
        console.log(err)
    }
})

module.exports = app
