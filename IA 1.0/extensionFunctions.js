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
                ],
                fields:[
                    {
                        label: "NS export name",
                        type: "select",
                        name: "NS_export_name",
                        supportsRefresh: true,
                        tooltip: "Choose this setting to change the name of export",
                        options: [
                            [
                                "Netsuite Export",
                                "Netsuite Export"
                            ],
                            [
                                "NS Export",
                                "NS Export"
                            ]
                        ]
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

function getpPutCallOptions(integrationId,integration,token)
{
    return {
        url:`https://api.staging.integrator.io/v1/integrations/${integrationId}`,
        method:'PUT',
        headers:{
            'Authorization':`Bearer ${token}`,
            'content-Type':'application/json'
        },
        body:JSON.stringify(integration)
    };
}

function getIntegrationOptions(integrationId,token)
{
    return {
        url:`https://api.staging.integrator.io/v1/integrations/${integrationId}`,
        method:'GET',
        headers:{
            'Authorization':`Bearer ${token}`,
            'content-Type':'application/json'
        }
    };
}

function getPostCallOptions(url,file,token)
{
    return {
        url:url,
        method:'POST',
        headers:{
            'Authorization':`Bearer ${token}`,
            'content-Type':'application/json'
        },
        body:fs.readFileSync(file)
    };
}
function getPutCallOptions(url,file,token)
{
    return {
        url:url,
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body:fs.readFileSync(file)
    }
}
const verifyConnectionFunc=function(options,callback)
{
    const integrationId=options._integrationId;
    const token=options.bearerToken;
    const integrationOptions=getIntegrationOptions(integrationId,token);
    request(integrationOptions,(error,response,body)=>{
        if(error)
        {
            return callback(new Error('error'));
        }
        else
        {
            const integration=JSON.parse(body);
            const connectionId=integration.install[0]._connectionId;
            const exportOptions=getPostCallOptions(`https://api.staging.integrator.io/v1/exports`,'./export.json',token);
            const ebody=JSON.parse(exportOptions.body);
            ebody._connectionId=connectionId;
            exportOptions.body=JSON.stringify(ebody);
            request(exportOptions,(error,response,body)=>{
                if(error)
                {
                    return callback(new Error('error'));
                }
                else
                {
                    const exportId=JSON.parse(body)._id;
                    console.log(JSON.parse(body));
                    const importOptions=getPostCallOptions(`https://api.staging.integrator.io/v1/imports`,'./import.json',token);
                    const ibody=JSON.parse(importOptions.body);
                    ibody._connectionId=connectionId;
                    importOptions.body=JSON.stringify(ibody);
                    request(importOptions,(error,response,body)=>{
                        if(error)
                        {
                            return callback(new Error('error'));
                        }
                        else
                        {
                            const importId=JSON.parse(body)._id;
                            console.log(JSON.parse(body));
                            const flowOptions=getPostCallOptions(`https://api.staging.integrator.io/v1/flows`,'./flow.json',token);
                            const fbody=JSON.parse(flowOptions.body);
                            fbody.pageProcessors[0]._importId=importId;
                            fbody.pageGenerators[0]._exportId=exportId;
                            fbody._integrationId=integrationId;
                            flowOptions.body=JSON.stringify(fbody);
                            request(flowOptions,(error,response,body)=>{
                                if(error)
                                {
                                    return callback(new Error('error'));
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
                                   
                                    const integrationPutCallOptions=getpPutCallOptions(integrationId,integration,token);
                                    request(integrationPutCallOptions,(error,response,body)=>{
                                        if(error)
                                        {
                                            return callback(new Error('error'));
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
    const connectionOptions=getPostCallOptions('https://api.staging.integrator.io/v1/connections','./netsuite.json',token);
    request(connectionOptions,(error,response,body)=>{
        if(error)
        {
            return callback(new Error('error'));
        }
        else
        {
            const connectionId=JSON.parse(body)._id;
            console.log(connectionId);
            const integrationOptions=getIntegrationOptions(integrationId,token);
            request(integrationOptions,(error,response,body)=>{
                if(error)
                {
                    return callback(new Error('error'));
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
                    const integrationPutCallOptions=getpPutCallOptions(integrationId,integration,token);
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
    const integrationOptions = getIntegrationOptions(integration,token);
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
            exportOptions=getPutCallOptions(`https://api.staging.integrator.io/v1/exports/${exportId}`,'./export.json',token);
            const ebody=JSON.parse(exportOptions.body);
            ebody.name="Netsuite new Export";
            ebody._connectionId=connectionId;
            exportOptions.body=JSON.stringify(ebody);
            
            request(exportOptions,(error,response,body)=>{
                if(error)
                {
                    return callback(new Error('error'));
                }
                else
                {
                    console.log(JSON.parse(body));
                    intobj.updateInProgress = false;
                    const intOptions = getpPutCallOptions(integration,intobj,token);
                    request(intOptions,(error,response,body)=>{
                        console.log(JSON.parse(body));
                        return callback(null,body);
                    });
                    
                }
            });
        });
        
        
        
    })
}
const persistSettings=function (options,callback)
{
    const integrationId=options._integrationId;
    const token=options.bearerToken;
    const intOptions=getIntegrationOptions(integrationId,token);
    request(intOptions,(error,response,body)=>{
        if(error)
        {
            return callback(new Error('error'));
        }
        var integrationObj=JSON.parse(body);
        const pending=options.pending;
        console.log(options);
        integrationObj.settings.sections[0].fields[0].value=pending.NS_export_name;
        const exportId=integrationObj.settings.commonresources.exports[0];
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
        exportOptions=getPutCallOptions(`https://api.staging.integrator.io/v1/exports/${exportId}`,'./export.json',token);
        const ebody=JSON.parse(exportOptions.body);
        ebody.name=pending.NS_export_name;
        ebody._connectionId=connectionId;
        exportOptions.body=JSON.stringify(ebody);
        request(exportOptions,(error,response,body)=>{
            if(error)
            {
                return callback(new Error('error'));
            }
            console.log(JSON.parse(body));
            const intoptions=getIntegrationOptions(integrationId,integrationObj,token);
            request(intoptions,(error,response,body)=>{
                if(error)
                {
                    return callback(new Error('error'));
                }
                return callback(null,body);
            });  
        })
    });
        
    });
}
var obj={
    installer:{
        installConnector:installConnector,
        verifyConnection:verifyConnectionFunc,
        updateConnector:updateConnector,
    },
    settings:{
        persistSettings:persistSettings,
        refreshMetadata: function (options, callback) {
            var arr=[];
            const integrationId=options._integrationId;
            const token=options.bearerToken;
            const intOptions=getIntegrationOptions(integrationId,token);
            request(intOptions,(error,response,body)=>{
                if(error)
                {
                    return callback(new Error('error'));
                }
                var integration=JSON.parse(body);
                console.log(options);
                arr.push(['Netsuite Export','Netsuite Export']);
                arr.push(['NS Export','NS Export']);
                integration.settings.sections[0].fields[0].options=arr;
                const intOptions=getpPutCallOptions(integrationId,integration,token);
                request(intOptions,(error,response,body)=>{
                    return callback(null,body);
                });
            });
        }
    },
    uninstaller:{
        preUninstallFunction: function (options, callback) {
            console.log('called preuninstall');
            const integration = options._integrationId;
            const token = options.bearerToken;
            const integrationOptions = getIntegrationOptions(integration,token);
            request(integrationOptions, (error, response, body) => {
                if (error) {
                    return callback(new Error('error'));
                }
                var intObj = JSON.parse(body);
                intObj.mode = 'uninstall';
                const putIntObj = getpPutCallOptions(integration,intObj,token);
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