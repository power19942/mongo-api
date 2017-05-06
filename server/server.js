var express = require("express");
var bodyParser = require("body-parser");
var {ObjectID} = require("mongodb");

var {mongoose} = require("./DB/mongoose.js");
var {Todo} = require("./models/todo.js");

var app = express();
var port = process.env.PORT || 3000;
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

app.get("/todos/:id",(req,res)=>{
    var id = req.param('id');
    if(ObjectID.isValid(id)){
       Todo.findById(id).then((todo)=>{
           if(!todo){
               return res.status(404).send();
           }
           res.send({todo});
       }).catch((e)=>{
           return res.status(400).send();
       });
    }else{
        return res.status(404).send();
    }
});

app.listen(port,()=>{
   console.log("run in "+port) ;
});