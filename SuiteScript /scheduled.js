function helper()
{
    var columns=new Array();
    var filters=new Array();
    columns[0]=new nlobjSearchColumn('id');
    filters[0]=new nlobjSearchFilter('entity',null,'equalto','25326');
    var search=nlapiCreateSearch('salesorder',null,filters,columns);
    var searchId=search.saveSearch('customer order','customsearch_allorders');
    var results=search.runSearch();
    for(var i=0;results!=null && i<results.length;i++)
    {
        nlapiLogExecution("Audit","id",results[i].getvalue('id'));
    }
}