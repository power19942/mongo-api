var {MongoClient,ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/todo",(err,db)=>{
    if(err){
        console.log("connection error: "+err);
        return;
    }

    db.collection("todo").findOneAndUpdate({_id:new ObjectID('590cb7fd34eefc2460e2952f')},{
        $set:{
            completed:false
        }
    },{
        returnOriginal:false
    })
        .then((res)=>{
        console.log(res);
    });

    db.close();
});