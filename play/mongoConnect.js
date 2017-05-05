// var mongoClient = require("mongodb").MongoClient;
 var {MongoClient,ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/todo",(err,db)=>{
  if(err){
      console.log("connection error: "+err);
      return;
  }
    console.log("success");

  db.collection("todo").insertOne({
      text:'fuck 2',
      completed:true
  },(err,res)=>{
     if(err){
         return console.log("error");
     }
     console.log(res.ops[0]._id.getTimestamp());
  });

  db.close();
});