function run(request,response)
{
    //item is created

    // var item=nlapiCreateRecord('inventoryitem');
    // item.setFieldValue('itemid','Mouse');
    // item.setFieldValue('cost',1599);
    // item.setFieldValue('subsidiary',1);
    // var itemId=nlapiSubmitRecord(item,true);
    // nlapiLogExecution("Audit","item_id",itemId);



    //revalue the inventory item

    // var revalue=nlapiCreateRecord('inventorycostrevaluation');
    // revalue.setFieldValue('account',64);
    // revalue.setFieldValue('item',2113); //itemId
    // revalue.setFieldValue('trandate','12/30/2021');
    // revalue.setFieldValue('subsidiary',1);
    // revalue.setFieldValue('location',2);
    // revalue.selectNewLineItem('costcomponent');
    // revalue.setCurrentLineItemValue('costcomponent','amount',0);
    // revalue.setCurrentLineItemValue('costcomponent','costcategory',3);
    // revalue.setCurrentLineItemValue('costcomponent','cost',1599);
    // revalue.commitLineItem('costcomponent');
    // var revalueId=nlapiSubmitRecord(revalue,true);



    //creating a purchase order

    // var purchaseOrder=nlapiCreateRecord('purchaseorder');
    // purchaseOrder.setFieldValue('entity',1305);
    // purchaseOrder.setFieldValue('trandate','12/30/2021');
    // purchaseOrder.setFieldValue('subsidiary',1);
    // purchaseOrder.setFieldValue('location',2);
    // purchaseOrder.selectNewLineItem('item');
    // purchaseOrder.setCurrentLineItemValue('item','item',2113);
    // purchaseOrder.setCurrentLineItemValue('item','amount',1599);
    // purchaseOrder.setCurrentLineItemValue('item','quantity',1);
    // purchaseOrder.commitLineItem('item');
    // var purchaseId=nlapiSubmitRecord(purchaseOrder,true);



    //tranforming the purchase order to recieve the items

    // var transformRecord=nlapiTransformRecord('purchaseorder',71018,'itemreceipt');
    // transformRecord.setFieldValue('postingperiod',289);
    // transformRecord.setFieldValue('trandate','12/30/2021');
    // recordId=nlapiSubmitRecord(transformRecord,true);


    //create a customer
    // var customer=nlapiCreateRecord('customer');
    // customer.setFieldValue('companyname','ABC Company');
    // customer.setFieldValue('email',"xyz@company.com");
    // customer.setFieldValue('subsidiary',1);
    // var customerId=nlapiSubmitRecord(customer,true);



    //create a salesorder
    var salesorder=nlapiCreateRecord('salesorder');
    salesorder.setFieldValue('entity',26157);
    salesorder.setFieldValue('subsidiary',1);
    salesorder.setFieldValue('orderstatus','B');
    salesorder.selectNewLineItem('item');
    salesorder.setCurrentLineItemValue('item','item',2113);
    salesorder.setCurrentLineItemValue('item','taxcode',-153);
    salesorder.setCurrentLineItemValue('item','amount',1599);
    salesorder.setCurrentLineItemValue('item','quantity',1);
    salesorder.commitLineItem('item');
    var salesId=nlapiSubmitRecord(salesorder,true);
}



