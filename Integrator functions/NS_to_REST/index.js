var expressExtension=require('express-integrator-extension');
var functions=require('./extensionFunctions');


var systemToken='933190f1002f41d19457ee5e42bafbb8';
var config={
    diy:functions,
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