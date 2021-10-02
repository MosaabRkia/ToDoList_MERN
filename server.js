const express = require('express')
const mongoose = require("mongoose");
const app = express() 
app.use(express.static("React/build"));

//cookies
var cookieParser = require("cookie-parser");
app.use(cookieParser());

//body
 const bodyParser = require("body-parser");
 app.use(bodyParser.json());


//kwt is the crypt words
const jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');


//cookies
// var cookieParser = require("cookie-parser");
// app.use(cookieParser());

//database Connect
mongoose.connect(
  "mongodb://mosaabrkia:bgx4RDT4dQeOuaLr@cluster0-shard-00-00.mt1zh.mongodb.net:27017,cluster0-shard-00-01.mt1zh.mongodb.net:27017,cluster0-shard-00-02.mt1zh.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-4upmps-shard-0&authSource=admin&retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connected to DB");
});



//schema items in list To Do
const itemListToDo = mongoose.model("itemListToDo", {
  Title: String,
  Description: String,
  Done: Boolean
});

//schema User
const UserOfTodo = mongoose.model("UsersOfTodo", {
  email:String,
  password:String,
  TaskList: [{type: mongoose.Schema.Types.ObjectId, ref: 'itemListToDo'}]
});
 

//function of decrypt password
function letsMakeASecret(password){
  let newPw =''
for (let index = 0; index < password.length; index++) {
 let x = password[index].charCodeAt() + (1 - index)
 newPw += String.fromCharCode(x);
}
return newPw
}

//check if login
app.get('/checkIfLoginedBefore',(req,res)=>{
  if(req.cookies.rol){
      res.send({cok:true})
  }else{
    res.send({cok:false})
  }

})

// create and login method
 app.post('/CreateAUserOrLogin',async (req,res)=>{
   const data = req.body;
   letsMakeASecret(data.password)
   const findUser = await UserOfTodo.findOne({email:data.email.toLowerCase()})
   if(findUser){
    const findUserWithPassword = await UserOfTodo.findOne({email:data.email.toLowerCase(),password:letsMakeASecret(data.password)})
    if(findUserWithPassword){
      console.log('Logined account : ', data.email)
      res.cookie('rol', findUserWithPassword._id);
      res.send({Login:true})
     }
     else{
      res.send({Login:false})
     }
   }
   else{
     //register new user
     const newUser = new UserOfTodo({
      email: data.email.toLowerCase(),
      password: letsMakeASecret(data.password),
      TaskList:[]
    });
    newUser.save().then(() => {
      console.log('registered new account : ', data.email)
    }).then(async()=>{
      const findUserWithPassword = await UserOfTodo.findOne({email:data.email.toLowerCase(),password:letsMakeASecret(data.password)})
      res.cookie('rol', findUserWithPassword._id);
      res.send({Login:true})
    })
   }
 })


 app.post('/AddNewTask',async (req,res)=>{
   const data = req.body;
   console.log(data)
   const CookiesData = req.cookies.rol;
   const user = await UserOfTodo.findOne({_id:CookiesData})
   if(user){
    const newTask = new itemListToDo({
      Title: data.taskName,
      Description: data.description,
  Done: false
    });
     user.TaskList.push(newTask)
     user.save()
     newTask.save()
     res.send({GotData:true})
   }
 
 })

 app.get('/getTasks',async (req,res)=>{
  const CookiesData = req.cookies.rol;
  const user = await UserOfTodo.findOne({_id:CookiesData})
  let list=[];
  if(user){
    user.TaskList.map(async (e)=>{
      let found = await itemListToDo.findOne({_id:e._id})
      if(found){
        list = [...list,found]
      }
    })
    // console.log("here is ",user.TaskList)
    // res.send({list:user.TaskList})
  }
  try {
    setTimeout(()=>{
      res.send(list)
      },2000)
  } catch (error) {
    throw new error("not worked sending list")
  }
 })
// app.post
// app.get
// app.put
// app.delete

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("opened port")
})
























// const express = require("express");
// const app = express();
// app.use(express.static("React/build"));




// const mongoose = require("mongoose");
// var cookieParser = require("cookie-parser");
// app.use(cookieParser());
// var bodyParser = require("body-parser");
// app.use(bodyParser.json());
// let arrUsr = [];
// mongoose.connect(
//   "mongodb://mosaabrkia:bgx4RDT4dQeOuaLr@cluster0-shard-00-00.mt1zh.mongodb.net:27017,cluster0-shard-00-01.mt1zh.mongodb.net:27017,cluster0-shard-00-02.mt1zh.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-4upmps-shard-0&authSource=admin&retryWrites=true&w=majority",
//   { useNewUrlParser: true, useUnifiedTopology: true }
// );
// //bgx4RDT4dQeOuaLr

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//   console.log("connected to DB");
// });




// const port = process.env.PORT || 3001;

// app.listen(port, function () {
//   console.log("listening", port);
// });
