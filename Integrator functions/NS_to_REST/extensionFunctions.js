var _=require("lodash");
var request=require('request');

var expressObj={
    hooks:{
        itemsExportPreSavePage:function(options,callback){
            console.log('ItemExportPreSavePageHook','So it begins...');
            console.log('ItemExportPreSavePageHook | Options',JSON.stringify(options));
            var exportsData=options.data||[];
            var preSavePageHooksResponseObject={data:[],errors:[]};
            _.each(exportsData,function(item){
                var x={};
                x['id']=item['id'];
                x['name']=item['Name'];
                x['desc']=item['Description'];
                x['base_price']=item['Base Price'];
                preSavePageHooksResponseObject.data.push(x);
            });
            console.log("ItemExportPreSavePageHook | preSavePageHooksResponseObject",JSON.stringify(preSavePageHooksResponseObject));
            callback(null,preSavePageHooksResponseObject);
        },
        itemImportPreMap:function(options,callback)
        {
            console.log('ItemImportPreMapHook','So it begins...');
            console.log('ItemImportPreMapHook | Options',JSON.stringify(options));
            try{
            return callback(null,options.data.map((d)=>{
                d['name']=d['name']+" "+d['id'];
                return {data:d}
            }));
            }
            catch(error)
            {
                return callback({errors:[{code:'error code',message:error}]});
            }
        }
    }
}

module.exports=expressObj;