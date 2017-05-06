var {ObjectID} =require("mongodb");

var {mongoose} = require("./../server/DB/mongoose.js");
const {Todo} = require("./../server/models/todo.js");

var id = "590d08d0ebdd72b80becb2c2";

if(ObjectID.isValid(id)){
    console.log("id valid");
}else{
    console.log("id not valid");
}

// Todo.find({
//     _id:id
// }).then((todos)=>{
//     console.log(todos);
// });
//
// Todo.findOne({
//     _id:id
// }).then((todos)=>{
//     console.log(todos.text);
// });

Todo.findById(id).then((todos)=>{
    console.log(todos);
}).catch((e)=>{

});