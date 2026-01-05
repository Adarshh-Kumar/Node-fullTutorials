const express=require('express');
const app=express();

const reqFilter=(req,res,next)=>{
    if(req.query.age<18){
        res.send("You are not eligible to access this page sir");
    }
    else if(req.query.age>=18){
        next();
    }
    if(!req.query.age){
        res.send("Please provide age");      
    }
    console.log('reqFilter called');
}
// app.use(reqFilter);

app.get('/',(req,res)=>{
    res.send("Welcome to HomePage");
})
app.get('/users',reqFilter,(req,res)=>{
    res.send("A lot of users are here");
})
app.listen(3000);