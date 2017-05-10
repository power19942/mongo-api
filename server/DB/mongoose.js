var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
 mongoose.connect(process.env.MONGO_URI||"mongodb://localhost:27017/TodoApp");
//mongoose.connect("mongodb://om:123@ds133211.mlab.com:33211/todos2017");

module.exports =  {mongoose};