function createRecord(){
    $$.logExecution("DEBUG",'TestRec','So it begins');
    //Item is created

    // var item=new $R({
    //     nlobjRecordType:"inventoryitem",
    //     nlobjFieldIds:{
    //         itemid:"Keyboard",
    //         subsidiary:"Honeycomb Holdings Inc.",
    //         cost:2999
    //     },
    //     submitRecordOptions:{
    //         ignoreMandatoryFields:true
    //     }

    // });
    // var itemId=item.save();



    //Revaluing the inventory item

    // var revalueInventory=new $R({
    //     nlobjRecordType:"inventorycostrevaluation",
    //     nlobjFieldIds:{
    //         account:64,
    //         item:itemId,
    //         trandate:'12/30/2021',
    //         subsidiary:"Honeycomb Holdings Inc.",
    //         location:"01: San Francisco : avc",
    //     },
    //     nlobjSublistIds:{
    //         costcomponent:[{
    //             amount:0,
    //             cost:2999,
    //             costcategory:3
    //         }]
    //     },
    //     submitRecordOptions:{
    //         ignoreMandatoryFields:true
    //     }
    // });
    // var revalueId=revalueInventory.save();



    //creating a purchase order

    // var purchaseOrder=new $R({
    //     nlobjRecordType:"purchaseorder",
    //     nlobjFieldIds:{
    //         entity:"ABC",
    //         trandate:'12/30/2021',
    //         location:"01: San Francisco : avc",
    //     },
    //     nlobjSublistIds:{
    //         item:[{
    //             item:itemId,
    //             amount:2599,
    //             quantity:10
    //         }]
    //     },
    //     submitRecordOptions:{
    //         ignoreMandatoryFields:true
    //     }
    // });
    // var purchaseId=purchaseOrder.save();



    //tranforming the purchase order to recieve the items

    // var transformRecord=nlapiTransformRecord('purchaseorder',purchaseId,'itemreceipt');
    // transformRecord.setFieldValue('postingperiod',289);
    // transformRecord.setFieldValue('trandate','12/30/2021');
    // recordId=nlapiSubmitRecord(transformRecord,true);



    //creating a customer

    // var record=new $R({
    //     nlobjRecordType:"customer",
    //     nlobjFieldIds:{
    //         isperson:true,
    //         firstname:"Sachin",
    //         lastname:"Gupta",
    //         email:"abcd@gmail.com",
    //         subsidiary:3
    //     }
    // });
    // var recId=record.save();



    //creating a salesorder
    // var salesOrder=new $R({
    //     nlobjRecordType:"salesorder",
    //     nlobjFieldIds:{
    //         entity:26156,
    //         orderstatus:'B'
    //     },
    //     nlobjSublistIds:{
    //         item:[{
    //             item:2112,
    //             taxcode:-153,
    //             amount:2999,
    //             quantity:10,
    //         }]
    //     }
    // });
    // var salesId=salesOrder.save();

    //item fulfillment
    var fulfillment=nlapiTransformRecord('salesorder',71026,'itemfulfillment');
    fulfillment.setFieldValue('postingperiod',289);
    fulfillment.setFieldValue('trandate','12/30/2021');
    fulfillment.selectNewLineItem('item');
    fulfillment.setCurrentLineItemValue('item','item',2112);
    fulfillment.setCurrentLineItemValue('item','itemReceive',true);
    fulfillment.setCurrentLineItemValue('item','quantity',5);
    fulfillment.commitLineItem('item');
    fulfillmentId=nlapiSubmitRecord(fulfillment,true);
}


