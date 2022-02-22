function helper()
{
    var columns=[];
    var filters=[];
    columns.push(new nlobjSearchColumn('id'));
    filters.push(new nlobjSearchFilter('entity',null,'equalto','25326'));
    var results=nlapiSearchRecord('salesorder',null,filters,columns);

    for(var i=0;results!=null && i<results.length;i++)
    {
        nlapiLogExecution("Audit","id",results[i].getvalue('id'));
    }
}