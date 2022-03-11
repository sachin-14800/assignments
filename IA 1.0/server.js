var expressExtension=require('express-integrator-extension');
var functions=require('./extensionFunctions');


var systemToken='65edce37601841afa5e569333db8e149';
var config={
    // diy:functions, // for diy functions only
    connectors:{'6229ba0a5508c525da020aa9':functions},  //for connectors
    systemToken:systemToken,
    port:8080
};
console.log('Starting the server');

expressExtension.createServer(config,function(err){
    if(err)
    {
        console.log("Failed to create integrator extension");
        throw err;
    }
    console.log("Server is started");
});