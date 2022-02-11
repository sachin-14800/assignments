const request = require('request');
const fs = require('fs');


const connBody = fs.readFileSync('./connection1.json');
const exportBody=fs.readFileSync('./export.json');
const importBody=fs.readFileSync('./import.json');
const flowBody=fs.readFileSync('./flow.json');
const integrationBody=fs.readFileSync('./integration.json');
let options = {
    url: 'https://api.integrator.io/v1/connections',
    method: 'POST',
    headers: {
        'Authorization': 'Bearer 1c6a578320724ee7bb0a0c7f54f101b8',
        'Content-Type': 'application/json'
    },
    body: connBody
}

request(options,(err, response, body) => {
    if (!err) {
        
        let conn1=JSON.parse(body);
        let eBody=JSON.parse(exportBody);
        eBody._connectionId=conn1._id;
        console.log(`Connection created with id ${conn1._id}`);
        // console.log(JSON.stringify(body));
        options.body=JSON.stringify(eBody);
        options.url='https://api.integrator.io/v1/exports';
         request(options,(err,response,body)=>{
            if(!err)
            {
                // console.log(JSON.parse(body));
                let exportId=JSON.parse(body)._id;
                console.log(`Export created with id ${exportId}`);
                let iBody=JSON.parse(importBody);
                iBody._connectionId=conn1._id;
                options.body=JSON.stringify(iBody);
                options.url='https://api.integrator.io/v1/imports';
                request(options,(err,response,body)=>{
                    if(!err)
                    {
                        // console.log(JSON.stringify(body));
                        let importId=JSON.parse(body)._id;
                        console.log(`Import created with id ${importId}`);
                        let fBody=JSON.parse(flowBody);
                        fBody.pageProcessors[0]._importId=importId;
                        fBody.pageGenerators[0]._exportId=exportId;
                        options.body=JSON.stringify(fBody);
                        options.url='https://api.integrator.io/v1/flows';
                        request(options,(err,response,body)=>{
                            if(!err)
                            {
                                let flowId=JSON.parse(body)._id;
                            console.log(`Flow created with id ${flowId}`);
                            console.log(JSON.parse(body));
                            let integrateBody=JSON.parse(integrationBody);
                            integrateBody._registeredConnectionIds.push(flowId);
                            // console.log(integrateBody._registeredConnectionIds);
                            options.body=JSON.stringify(integrateBody);
                            request(options,(err,response,body)=>{
                                if(!err)
                                {
                                    let integrationId=JSON.parse(body)._id;
                                    console.log(`Integration is created with id ${integrationId}`);
                                    console.log(JSON.parse(body));
                                }
                                else
                                console.log(err);
                            })
                            }
                            else
                            console.log(err);
                        })
                    }
                    else
                    console.log(err);
                })
            }
            else
            console.log(err);
        })
        
    }
    else
        console.log(err);
});

