const express=require('express');
const app=express();

app.get('/',(req,res)=>{
res.send("hello World!");
res.sendStatus(200);
});

app.post('/items',(req,res)=>{
    console.log("Item created");
    res.status(200).send({"status":"OK"});
});
app.listen(8080,()=>{
    console.log("server is running...");
});