const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const salt = 9;
const UserSchema = new mongoose.Schema({
    name:String,
    password:String,
})

const User = new mongoose.model("User",UserSchema);
module.exports = User;

module.exports.register = (data,callback)=>{
    User.find({name:data.name},(err,founded)=>{
        console.log(founded)
        if(founded == ''){
            bcrypt.hash(data.password, salt,(err,hash)=>{
                if(err)callback(err)
                else{
                    let userData = data;
                    userData.password = hash;
                    let newUser = new User(userData);
                    newUser.save(callback);
                }
            })
        }else{
            callback(err)
        }
    })
}
module.exports.login = (data,callback)=>{
    User.findOne({name:data.name},(err,founded)=>{
        if(err) return callback(err,null);  
        if(!founded) return callback(null,null);
        console.log(founded)
        if(founded){
            console.log("hallo")
            console.log(data,founded)
            bcrypt.compare(data.password,founded.password,(err,res)=>{
                if(err){
                    console.log(err);
                    return callback(err,null);
                } 
                if(res == true){
                    console.log(res)
                    return callback(null,founded);
                } 
                if(res == false){
                    console.log("false")
                    return callback("password rigth emes",null);
                } 
            })
        }
    })
}