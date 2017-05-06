var express = require("express");
var bodyParser = require("body-parser");
var {mongoose} = require("./DB/mongoose.js");
var {Todo} = require("./models/todo.js");

var app = express();
app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    var todo = new Todo({
        text:req.body.text
    });
    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);
    });
});

app.get('/todos',(req,res)=>{
   Todo.find().then((docs)=>{
       res.send({
           docs
       });
   },(e)=>{
       res.status(400).send(e);
   }) ;
});

app.listen(3000,()=>{
   console.log("run in 3000") ;
});