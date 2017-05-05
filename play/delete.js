var {MongoClient,ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/todo",(err,db)=>{
    if(err){
        console.log("connection error: "+err);
        return;
    }

    db.collection("todo").findOneAndDelete({text:'fuck'}).then((res)=>{
        console.log(res);
    });

    db.close();
});