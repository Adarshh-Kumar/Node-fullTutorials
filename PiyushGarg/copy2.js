const http=require('http');
const fs=require('fs');
const url=require('url');
const express=require('express');

const app=express();
app.get('/',(req,res)=>{
    res.send("Home page from express");
})

app.get('/about',(req,res)=>{
    res.send("This is an about page from express");
})

app.get('/ssup',(req,res)=>{
    res.send("WHATisAPP");
})


const server=http.createServer((req,res)=>{
    // const log='${Date.now()}: ${req.url}:New Request';

    const log=`${Date.now()}: with url ${req.url}`;
    const myUrl=url.parse(req.url,true);
    fs.appendFile("log.txt",log,(err)=>{
        if(err){
            console.log("Error writing log:",err);
        }
    })

    switch(myUrl.pathname){
    
        case '/':
            res.end("Home page");
            break;
        case '/aboout':
            res.end("This is about page");
            break;
        default:
            res.end("Not found");
            break;

    }


})

server.listen(8000);