const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const PORT = 2005;
const db_settings = require('./mongo-op.js')
const bodyParser = require('body-parser');
const app = express();

mongoose.connect(db_settings.db_url_dev_mode, {useNewUrlParser: true});
app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));

const usermodul = require('./modules/users');
const notemodul = require('./modules/notes')

app.post("/api/regist",(req,res)=>{
    usermodul.register(
        req.body,
            (err,result)=>{
                console.log(result)

                if(result == err){
                    return res.status(500).send(err);
                } else {res.status(200).send([{status:"success"}]);
            }     
        }
    )
})
app.post("/api/login",(req,res)=>{
    usermodul.login(
        req.body,(err,user)=>{
            if(err)return res.status(500).send(err);
            if(!user)return res.status(401).send(err);
            else{res.status(200).send(user)};
        }
    )
})

app.post("/api/note",(req,res)=>{
    notemodul.notesave(
        req.body,(err)=>{
            res.status(200).send("success")
        }
    )
})
app.get("/api/get_all",(req,res)=>{
    notemodul.get_all_notes((err,notes)=>{
        if(err)return res.status(500).send(err);
        else return res.status(200).send(notes);
    })
})
app.post("/api/delete_note",(req,res)=>{
    console.log(req.body)
    notemodul.delete_note(req.body,(err,notes)=>{
        if(err)return res.status(500).send(err);
        else return res.status(200).send(notes)
    })
})
app.post("/api/update_note",(req,res)=>{
    notemodul.update(req.body,(err)=>{
        res.send({status:"success"});
    })
})

app.listen(PORT ,(err)=>{
    if(err)console.log("hey", err);
    console.log("work on port:",PORT);
})