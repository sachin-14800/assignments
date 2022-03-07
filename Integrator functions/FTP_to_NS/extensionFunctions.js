var _=require("lodash");
var request=require('request');

var expressObj={
    hooks:{
        FileExportPreSavePage:function(options,callback){
            console.log('FileExportPreSavePageHook','So it begins...');
            console.log('FileExportPreSavePageHook | Options',JSON.stringify(options));
            var exportsData=options.data || [];
            var preSavePageHooksObject={data:[],errors:[]};
            _.each(exportsData,function(movie){
                movie['MOVIE NAME']=movie['name'];
                preSavePageHooksObject.data.push(movie);
            });
            console.log('FileExportPreSavePageHook | preSavePageHooksObject',preSavePageHooksObject);
            callback(null,preSavePageHooksObject);
        }
    }
}

module.exports=expressObj;