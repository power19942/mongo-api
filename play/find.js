var {MongoClient,ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/todo",(err,db)=>{
    if(err){
        console.log("connection error: "+err);
        return;
    }

    db.collection("todo").find().count().then((count)=>{
        console.log(count);
    },(err)=>{
        console.log("error",err)
    });

    db.close();
});