
function getOrders(data) {
    nlapiLogExecution('Debug', 'sent data', data);
    var filters =new Array();
    filters[0]=new nlobjSearchFilter('status', null, 'is', 'SalesOrd:F');
    var columns =new Array();
    columns[0]=new nlobjSearchColumn('total');
    columns[1]=new nlobjSearchColumn('tranid');


    // var search = nlapiCreateSearch('transaction', filters, columns);
    // var searchId=search.saveSearch('Orders','customsearch_pending_orders');

    var search=nlapiSearchRecord('transaction','customsearch_pending_orders',filters,columns);
    nlapiLogExecution('Debug','receive data',search);
    var res=[];

    for(var i=0;search!=null && i<search.length;i++)
    {
        var record=search[i];
        res.push({orderno:record.getValue('tranid'),total:record.getValue('total')});
    }
    nlapiLogExecution('Debug','receive data',res);
	return JSON.stringify(res);
}

