const request = require('request');
const fs = require('fs');
const rp=require('request-promise');

const connBody = fs.readFileSync('./connection1.json');
const exportBody=fs.readFileSync('./export.json');
const importBody=fs.readFileSync('./import.json');
const flowBody=fs.readFileSync('./flow.json');
const integrationBody=fs.readFileSync('./integration.json');
let options = {
    url: 'https://api.integrator.io/v1/connections',
    method: 'POST',
    headers: {
        'Authorization': 'Bearer ****',
        'Content-Type': 'application/json'
    },
    body: connBody
}

rp(options)
.then(body=>{
    let conn1=JSON.parse(body);
    let eBody=JSON.parse(exportBody);
    eBody._connectionId=conn1._id;
    console.log(`Connection created with id ${conn1._id}`);
    options.body=JSON.stringify(eBody);
    options.url='https://api.integrator.io/v1/exports';
    rp(options)
    .then(body=>{
        let exportId=JSON.parse(body)._id;
        console.log(`Export created with id ${exportId}`);
        let iBody=JSON.parse(importBody);
        iBody._connectionId=conn1._id;
        options.body=JSON.stringify(iBody);
        options.url='https://api.integrator.io/v1/imports';
        rp(options)
        .then(body=>{
            let importId=JSON.parse(body)._id;
            console.log(`Import created with id ${importId}`);
            let fBody=JSON.parse(flowBody);
            fBody.pageProcessors[0]._importId=importId;
            fBody.pageGenerators[0]._exportId=exportId;
            options.body=JSON.stringify(fBody);
            options.url='https://api.integrator.io/v1/flows';
            rp(options)
            .then(body=>{
                let flowId=JSON.parse(body)._id;
                console.log(`Flow created with id ${flowId}`);
                console.log(JSON.parse(body));
                let integrateBody=JSON.parse(integrationBody);
                integrateBody._registeredConnectionIds.push(flowId);
                // console.log(integrateBody._registeredConnectionIds);
                options.body=JSON.stringify(integrateBody);
                rp(options)
                .then(body=>{
                    let integrationId=JSON.parse(body)._id;
                    console.log(`Integration is created with id ${integrationId}`);
                    console.log(JSON.parse(body));
                })
                .catch(err=>{
                    console.log(`Error in creating the integration ${err}`);
                })
            })
            .catch(err=>{
                console.log(`Error in creating the flow ${err}`);
            })
        })
        .catch(err=>{
            console.log(`Error in creating import ${err}`);
        })
    })
    .catch(err=>{
        console.log(`Error in creating export ${err}`);
    })
})
.catch(err=>{
    console.log(`Error in creating the connection ${err}`);
});

