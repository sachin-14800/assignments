function preMap(options)
{
    nlapiLogExecution('Debug','So it begins...');
    nlapiLogExecution('Debug','NSImportPreMapHook | Options',JSON.stringify(options));
    // var responseData={data:[]};
    // _.each(options.data,function(movie,index){
    //     responseData.data.push(movie);
    // });
    return options.data;
}