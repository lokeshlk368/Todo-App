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


var todoList=[
    {
        description:"lojesju",
        category:"dfsdfsdfsd",
        date:'2020-04-4'
    }, 

    {
        description:"lojmabniesju",
        category:"dfsdfsdsvsdvsfvsfvfsvsfdfsd",
        date:'2020-04-4'
    }, 

    {
        description:"ldddddddddddddddojesju",
        category:"dfsdvsdvsddfsdfsd",
        date:'2020-03-4'
    }
      
]

// Sending these data to ejs
// app.get('/',function(req,res)
// {
// //    res.send("<h1>Cool it is running fine</h1>");
//         return res.render('todo',
//         {
//             title:"todo-app",
//             todo_list:todoList
//         });
// });

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




// app.post('/create-todo',function(req,res)
//  {
//     //  console.log(req.body);
//     // return res.send('<h1>Hello lokesh</h1>');

//     todoList.push({
//         description:req.body.description,
//         category:req.body.category,
//         date:req.body.date
//     })
//     return res.redirect('/');

// })

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

//delete from database single task

app.get('/delete_todo_single',function(req,res){
      let id=req.query.id;

      Todo.findByIdAndDelete(id,function(err){
          if(err)
          {
              console.log("error in deleteing ab object from database");
              return;
          }
          return res.redirect('back');
      })
});


//deleting multiple task from database

app.post('/delete-todo', function(req, res) {
    let ids = req.body.task;
    console.log(ids);
    // if single task is to be deleted
    if (typeof(ids) == "string") {
        Todo.findByIdAndDelete(ids, function(err) {
            if (err) { 
                console.log("error in deleting"); 
                return; 
            }
        });
    } else {    // if multiple task is to be deleted
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