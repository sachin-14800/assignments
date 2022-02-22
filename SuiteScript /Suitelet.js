function helper(request,response)
{
    var customer=nlapiCreateRecord('customer');
    customer.setFieldValue('companyname','ABC');
    customer.setFieldValue('subsidiary',3);
    var customerId=nlapiSubmitRecord(customer);
    var item=nlapiCreateRecord('inventoryitem');
    item.setFieldValue('itemid','Smart Watch');
    item.setFieldValue('cost',3800);
    var itemId=nlapiSubmitRecord(item);
    var salesOrder=nlapiCreateRecord('salesorder');
    salesOrder.setFieldValue('entity',customerId);
    salesOrder.setFieldValue('subsidiary',3);
    salesOrder.setLineItemValue('item','item',1,itemId);
    salesOrder.setLineItemValue('item','amount',1,3800);
    nlapiSubmitRecord(salesOrder);
}

// function testSuitelet(request, response) {
//     var recordFile = $$.printRecord('transaction', 1917, 'PDF')
//               recordFile.setFolder('-10')
//               recordFile.setName(1917 + '_' + Date.now())
//               var fileId = $$.submitFile(recordFile)
//   //create item
//   // var record = nlapiCreateRecord('inventoryitem')
//   // record.setFieldValue('itemid', 'testItemFromScript')
//   // var itemRecId = nlapiSubmitRecord(record, true);
//   // nlapiLogExecution('Audit','item id',itemRecId);

//   //create adjustment inventory
// //    createInvAdj();

//   //create customer
//   // var custRec = nlapiCreateRecord("customrecord1133");
//   // custRec.setFieldValue('name', "testCust123");//employee number
//   // var custid = nlapiSubmitRecord(custRec);
// }

// function createInvAdj(record) {
//   var load_inv = nlapiCreateRecord('inventoryadjustment');
//   load_inv.setFieldValue('subsidiary', 'Honeycomb Holdings Inc.');
//   load_inv.setFieldValue('account', '1100 Accounts Receivable');
    
//   load_inv.selectNewLineItem('inventory');
//   load_inv.setCurrentLineItemValue('inventory', 'item', 'Wood polish');
//   load_inv.setCurrentLineItemValue('inventory', 'location', '01: San Francisco : avc');
//   load_inv.setCurrentLineItemValue('inventory', 'adjustqtyby', 1);
//   var subrec = load_inv.createCurrentLineItemSubrecord('inventory', 'inventorydetail');
// nlapiLogExecution('Audit','Done till','rec level');
//   subrec.selectNewLineItem('inventoryassignment');
//   subrec.setCurrentLineItemText('inventoryassignment', 'issueinventorynumber', '1');
//   subrec.setCurrentLineItemValue('inventoryassignment', 'binnumber', 1);
//   subrec.setCurrentLineItemValue('inventoryassignment', 'quantity', 1);
//   subrec.commitLineItem('inventoryassignment');
//   subrec.commit();

//   load_inv.commitLineItem('inventory');
//   var invAdjRecId = nlapiSubmitRecord(load_inv);
//   nlapiLogExecution('Audit','invAdjRecId',invAdjRecId);
// }


function getRecord(datain) {
    nlapiLogExecution('Debug', 'sent data', datain); // e.g recordtype="customer", id=769
    var filters = new Array();
    filters[0] = new nlobjSearchFilter('status', null, 'anyOf', 'Pending Billing');
    // Define search columns
    var columns = new Array();
    columns[0] = new nlobjSearchColumn('total');
    columns[1] = new nlobjSearchColumn('tranid');
    // Create the saved search
    var search = nlapiCreateSearch('transaction', filters, columns);

    var searchresults = search.runSearch();
    var resultIndex = 0;
    var resultStep = 1;
    var resultSet;
    var res = []
    do {
        resultSet = searchresults.getResults(resultIndex, resultIndex + resultStep);
        resultIndex = resultIndex + resultStep;
        for (var i = 0; !!resultSet && i < resultSet.length; i++) {
            var total = resultSet[0].valuesByIdx[1].text;
            var orderno = resultSet[0].valuesByIdx[2].text;
            res.push({'total' : total,'orderno' : orderno})
        }
    } while (resultSet.length > 0);
//	return JSON.stringify(res);
    return '{ "name":"John", "age":30, "city":"New York"}';
}