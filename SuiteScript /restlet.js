
function getOrders(data) {
    nlapiLogExecution('Debug', 'sent data', data);
    var filters =new Array();
    filters[0]=new nlobjSearchFilter('status', null, 'is', 'SalesOrd:F');
    var columns =new Array();
    columns[0]=new nlobjSearchColumn('total');
    columns[1]=new nlobjSearchColumn('tranid');


    var search = nlapiCreateSearch('transaction', filters, columns);
    var searchId=search.saveSearch('Orders','customsearch_pending_orders');

    search=nlapiLoadSearch('transaction','customsearch_pending_orders');
    var res=[];
    
    var searchresults = search.runSearch();
    for(var i=0;searchresults!=null && i<searchresults.length;i++)
    {
        res.push({orderno:searchresults[i].getValue('tranid'),total:searchresults[i].getValue('total')});
    }
    nlapiLogExecution('Debug','receive data',JSON.stringify(res));
	return JSON.stringify(res);
}

