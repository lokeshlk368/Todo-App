const express=require('express');
const path=require('path');
const port=8000;

const db=require('./config/mongoose');
const Todo=require('./models/todo');
const app=express();
app.use(express.urlencoded());
app.use(express.static('assets'));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));



//sending data from database to home page
app.get('/',function(req,res)
{
   Todo.find({},function(err,todo){
       if(err)
       {
           console.log("error in fetching todo list");
           return;
       }
       return res.render('todo',
              {
                    title:"todo-app",
                    todo_list:todo
             });

   })
});



//push into the database
app.post('/create-todo',function(req,res)
 {
     Todo.create({
         description:req.body.description,
         category:req.body.category,
         date:req.body.date
     },function(err,newTodo){
              if(err){
                  console.log("Error in creating the todo");
                  return;
              }
              console.log('************',newTodo);
              return res.redirect('/');
     });
});


//deleting multiple task from database

app.post('/delete-todo', function(req, res) {
    let ids = req.body.task;
    console.log(ids);
    if (typeof(ids) == "string") {
        Todo.findByIdAndDelete(ids, function(err) {
            if (err) { 
                console.log("error in deleting"); 
                return; 
            }
        });
    } else {  
        for (let i = 0; i < ids.length; i++) {
            Todo.findByIdAndDelete(ids[i], function (err) {
                if (err) { 
                    console.log("error in deleting");
                    return; 
                }
            });
        }
    }
    return res.redirect('back');
});



app.listen(port,function(err){
if(err)
{
    console.log("error in port running the port");
    return;
}
console.log("Server is runnig up with port",port);

});