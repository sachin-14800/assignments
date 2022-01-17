const request=require('request');
const fs=require('fs');
const path=require('path');

request('http://www.google.com',function(error,response,body){
    if(error)
    {
        console.log(`Error is ${error}`);
        return;
    }
    fs.writeFileSync(path.join(__dirname,'google.html'),body,'utf8');
});
