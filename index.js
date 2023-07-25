const bodyParser = require("body-parser")
const express = require("express")
const mongoose = require("mongoose")
const ejs = require("ejs")

mongoose.connect("mongodb://127.0.0.1:27017/sahil_test_todo_db");

const dataSchema = mongoose.Schema({
    title: String , 
    desc: String
});

const Data = new mongoose.model("Data" , dataSchema);


const app = express();

app.use(express.static("public"))
app.set("view engine" , "ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , (req , res)=>{
    Data.find({}).then(foundData=>{
        res.render("home", {datas: foundData})
    })
});

app.post("/" , (req , res)=>{
    const newData = new Data({
        title: req.body.title , 
        desc: req.body.description
    })
    newData.save();
    res.redirect("/");
})

app.post("/delete" , (req , res)=>{
    Data.findByIdAndRemove(req.body.del_btn)
    .then(()=>{
        // alert("ToDo Deleted")
        res.redirect("/");
    })
    .catch((err)=>{
        // alert("ToDo Deleted");
        console.log(err);
    })
})

app.listen(3000 , ()=>{
    console.log("Server Started at 3000")
})