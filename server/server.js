var _ = require("lodash");
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

app.delete('/todos/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        res.status(400).send()
    }else{
        Todo.findByIdAndRemove(id).then((doc)=>{
            if(!doc){
                res.status(404).send();
            }
            res.send({doc});
        }).catch((e)=>{
            res.status(400).send(e);
        })
    }
});


app.patch('/todos/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        res.status(400).send()
    }else{
        var body = _.pick(req.body,['text','completed']);
        if(_.isBoolean(body.completed) && body.completed){
            body.completedAt = new Date().getTime();
        }else{
            body.completedAt=false;
            body.completedAt=null;
        }
        Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((doc)=>{
            if(!doc){
                return res.status(404).send();
            }
            res.send({doc});
        }).catch((e)=>{
            res.status(400).send(e);
        });
    }
});

app.listen(port,()=>{
   console.log("run in "+port) ;
});