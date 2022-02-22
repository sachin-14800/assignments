function run(request,response)
{
    var item=nlapiCreateRecord('inventoryitem');
    item.setFieldValue('itemid','Mouse');
    item.setFieldValue('cost',1599);
    var itemId=nlapiSubmitRecord(item,true);
    nlapiLogExecution("Audit","item_id",itemId);

    var adjustment=nlapiCreateRecord('inventoryadjustment');
    adjustment.setFieldValue('subsidiary','Honeycomb Holdings Inc.');
    adjustment.setFieldValue('account','1100 Accounts Receivable');
    adjustment.selectNewLineItem('inventory');
    adjustment.setCurrentLineItemValue('inventory','item','Mouse');
    adjustment.setCurrentLineItemValue('inventory','location','01: San Francisco : avc');
    adjustment.setCurrentLineItemValue('inventory','adjustqtyby',1);
    adjustment.commitLineItem('inventory');
    var adjustmentId=nlapiSubmitRecord('inventoryadjustment',true);
    nlapiLogExecution("Audit",'id',adjustmentId);
}



