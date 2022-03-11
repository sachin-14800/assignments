const fs=require('fs');
const _ =require('lodash');
const request=require('request');

function getSettingObj(flowId) {
    return {
        sections: [
            {
                title: "Common",
                flows: [
                    {
                        _id: flowId,
                        showMapping: true,
                        showSchedule: false,
                        disableSlider: true
                    }
                ]
            }
        ],
        commonresources:{
            imports:[],
            exports:[],
            flows:[]
        }
    }
}
const verifyConnectionFunc=function(options,callback)
{
    const integrationId=options._integrationId;
    const token=options.bearerToken;
    const integrationOptions={
        url:`https://api.staging.integrator.io/v1/integrations/${integrationId}`,
        method:'GET',
        headers:{
            'Authorization':`Bearer ${token}`,
            'content-Type':'application/json'
        }
    }
    request(integrationOptions,(error,response,body)=>{
        if(error)
        {
            console.log(error);
            callback(error,null);
        }
        else
        {
            const integration=JSON.parse(body);
            const connectionId=integration.install[0]._connectionId;
            const exportOptions={
                url:`https://api.staging.integrator.io/v1/exports`,
                method:'POST',
                headers:{
                    'Authorization':`Bearer ${token}`,
                    'content-Type':'application/json'
                },
                body:fs.readFileSync('./export.json')
            }
            const ebody=JSON.parse(exportOptions.body);
            ebody._connectionId=connectionId;
            exportOptions.body=JSON.stringify(ebody);
            request(exportOptions,(error,response,body)=>{
                if(error)
                {
                    console.log(error);
                    callback(error,null);
                }
                else
                {
                    const exportId=JSON.parse(body)._id;
                    console.log(JSON.parse(body));
                    const importOptions={
                        url:`https://api.staging.integrator.io/v1/imports`,
                        method:'POST',
                        headers:{
                            'Authorization':`Bearer ${token}`,
                            'content-Type':'application/json'
                        },
                        body:fs.readFileSync('./import.json')
                    }
                    const ibody=JSON.parse(importOptions.body);
                    ibody._connectionId=connectionId;
                    importOptions.body=JSON.stringify(ibody);
                    request(importOptions,(error,response,body)=>{
                        if(error)
                        {
                            console.log(error);
                            callback(error,null);
                        }
                        else
                        {
                            const importId=JSON.parse(body)._id;
                            console.log(JSON.parse(body));
                            const flowOptions={
                                url:`https://api.staging.integrator.io/v1/flows`,
                            method:'POST',
                            headers:{
                                'Authorization':`Bearer ${token}`,
                                'content-Type':'application/json'
                            },
                            body:fs.readFileSync('./flow.json')
                            }
                            const fbody=JSON.parse(flowOptions.body);
                            fbody.pageProcessors[0]._importId=importId;
                            fbody.pageGenerators[0]._exportId=exportId;
                            fbody._integrationId=integrationId;
                            flowOptions.body=JSON.stringify(fbody);
                            request(flowOptions,(error,response,body)=>{
                                if(error)
                                {
                                    console.log(error);
                                    callback(error,null);
                                }
                                else
                                {
                                    const flowId=JSON.parse(body)._id;
                                    console.log(JSON.parse(body));
                                    
                                    integration.settings=getSettingObj(flowId);
                                    integration.settings.commonresources.flows.push(flowId);
                                    integration.settings.commonresources.exports.push(exportId);
                                    integration.settings.commonresources.imports.push(importId);
                                    integration.install[0].completed=true;
                                    integration.mode="settings";
                                   
                                    const integrationPutCallOptions={
                                        url:`https://api.staging.integrator.io/v1/integrations/${integrationId}`,
                                        method:'PUT',
                                        headers:{
                                            'Authorization':`Bearer ${token}`,
                                            'content-Type':'application/json'
                                        },
                                        body:JSON.stringify(integration)
                                    };
                                    request(integrationPutCallOptions,(error,response,body)=>{
                                        if(error)
                                        {
                                            console.log(error);
                                            callback(error,null);
                                        }
                                        else
                                        {
                                            console.log(body);
                                            return callback(null,body);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}

const installConnector=function (options,callback)
{
    const integrationId=options._integrationId;
    const token=options.bearerToken;
    const connectionOptions={
        url:'https://api.staging.integrator.io/v1/connections',
        method:'POST',
        headers:{
            'Authorization':`Bearer ${token}`,
            'content-Type':'application/json'
        },
        body:fs.readFileSync('./netsuite.json')
    }
    request(connectionOptions,(error,response,body)=>{
        if(error)
        {
            console.log(error);
            callback(error,null);
        }
        else
        {
            const connectionId=JSON.parse(body)._id;
            console.log(connectionId);
            const integrationOptions={
                url:`https://api.staging.integrator.io/v1/integrations/${integrationId}`,
                method:'GET',
                headers:{
                    'Authorization':`Bearer ${token}`,
                    'content-Type':'application/json'
                }
            }
            request(integrationOptions,(error,response,body)=>{
                if(error)
                {
                    console.log(error);
                    callback(error,null);
                }
                else{
                    const integration=JSON.parse(body);
                    console.log(integration);
                    integration.mode="install";
                    var netsuiteObj={
                        name:"Netsuite Configuration",
                        description:"netsuite installation",
                        completed:false,
                        installerFunction:"verifyConnection",
                        uninstallerFunction:"deleteConnection",
                        _connectionId:connectionId
                    };
                    integration.install.push(netsuiteObj);
                    console.log(integration);
                    const integrationPutCallOptions={
                        url:`https://api.staging.integrator.io/v1/integrations/${integrationId}`,
                        method:'PUT',
                        headers:{
                            'Authorization':`Bearer ${token}`,
                            'content-Type':'application/json'
                        },
                        body:JSON.stringify(integration)
                    };
                    request(integrationPutCallOptions,(error,response,body)=>{
                        if(error)
                        {
                            console.log(error);
                            callback(error,null);
                        }
                        else{
                            console.log(JSON.stringify(body));
                            return callback(null,body);
                        }
                    });

                }
            });
        }
    });
}
const updateConnector=function(options,callback)
{
    const integration = options._integrationId;
    const token = options.bearerToken;
    const integrationOptions = {
        url: `https://api.staging.integrator.io/v1/integrations/${integration}`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
    request(integrationOptions,(error,response,body)=>{
        if (error) {
            return callback(new Error('error'));
        }
        const intobj=JSON.parse(body);
        const exportId=intobj.settings.commonresources.exports[0];
        var exportOptions={
            url:`https://api.staging.integrator.io/v1/exports/${exportId}`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }
        request(exportOptions,(error,response,body)=>{
            if(error)
            {
                return callback(new Error('error'));
            }
            const connectionId=JSON.parse(body)._connectionId;
            exportOptions={
                url:`https://api.staging.integrator.io/v1/exports/${exportId}`,
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body:fs.readFileSync('./export.json')
            }
            const ebody=JSON.parse(exportOptions.body);
            ebody.name="Netsuite new Export";
            ebody._connectionId=connectionId;
            exportOptions.body=JSON.stringify(ebody);
            intobj.updateInProgress = false;
            request(exportOptions,(error,response,body)=>{
                if(error)
                {
                    return callback(new Error('error'));
                }
                else
                {
                    console.log(JSON.parse(body));
                    const intOptions = {
                        url: `https://api.staging.integrator.io/v1/integrations/${integration}`,
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body:JSON.stringify(intobj)
                    };
                    request(intOptions,(error,response,body)=>{
                        console.log(JSON.parse(body));
                        return callback(null,body);
                    })
                    
                }
            });
        });
        
        
        
    })
}
var obj={
    installer:{
        installConnector:installConnector,
        verifyConnection:verifyConnectionFunc,
        updateConnector:updateConnector,
    },
    settings:{
        persistSettings: function (options, callback) {
        },
        refreshMetadata: function (options, callback) {}
    },
    uninstaller:{
        preUninstallFunction: function (options, callback) {
            console.log('called preuninstall');
            const integration = options._integrationId;
            const token = options.bearerToken;
            const integrationOptions = {
                url: `https://api.staging.integrator.io/v1/integrations/${integration}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
            request(integrationOptions, (error, response, body) => {
                if (error) {
                    return callback(new Error('error'));
                }
                var intObj = JSON.parse(body);
                intObj.mode = 'uninstall';
                const putIntObj = {
                    url: `https://api.staging.integrator.io/v1/integrations/${integration}`,
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(intObj)
                };
                request(putIntObj, (error, response, body) => {
                    console.log(JSON.parse(body));
                    return callback(null, [{
                        "name": "Connector App",
                        "description": "Uninstall connector app from shopify store",
                        "imageURL": "",
                        "completed": false,
                        "uninstallerFunction": "verifyAppUninstallation"
                    }]);
                })
            });
        },
        verifyAppUninstallation: function (options, callback) {
            console.log("App uninstalled");
            return callback(null, { success: true })
        },
        uninstallConnector:function(options,callback)
        {
            return callback();
        }
    }
}

module.exports=obj;