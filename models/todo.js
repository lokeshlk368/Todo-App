const mongoose=require('mongoose');
const todoSchema=new mongoose.Schema({
    // description:"lojesju",
    // category:"dfsdfsdfsd",
    // date:'2020-04-4'
    description:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        require:true
    }
});

const Todo=mongoose.model('Todo',todoSchema);

module.exports=Todo;