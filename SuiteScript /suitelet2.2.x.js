/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */

 define(['N/record','N/log'],
 function(record,log)
 {
     function helper()
     {
        //  var itemId=createItem();
        // revalueInventoryItem(itemId);
        // var purchaseId=createPurchaseOrder();
        // var transformRecord=record.transform({
        //     fromType:'purchaseorder',
        //     fromId:purchaseId,
        //     toType:'itemreceipt'
        // });
        // transformRecord.setValue({fieldId:'postingperiod',value:289});
        // transformRecord.setValue({fieldId:'trandate',value:'12/30/2021'});
        // var recordId=transformRecord.save();
     }
    //  function createItem()
    //  {
    //      try{
    //          var item=record.create({
    //              type:'inventoryitem'
    //          });
    //          item.setValue({
    //              fieldId:'itemid',
    //              value:'Multiconnector'
    //          });
    //          item.setValue({
    //              fieldId:'cost',
    //              value:5999
    //          });
    //          item.setValue({
    //              fieldId:'subsidiary',
    //              value:1
    //          });
    //          var itemId=item.save();
    //          return itemId;
    //      }catch(error)
    //      {
    //          log.error({
    //              title:"Item is not created",
    //              details:error.message
    //          })
    //      }
    //  }
    //  function revalueInventoryItem(itemId)
    //  {
    //     var revalue=record.create({
    //         type:'inventorycostrevaluation',
    //     });
    //     revalue.setValue({fieldId:'account',value:64});
    //     revalue.setValue({fieldId:'item',value:itemId});
    //     revalue.setValue({fieldId:'trandate',value:new Date('12/30/2021')});
    //     revalue.setValue({fieldId:'subsidiary',value:1});
    //     revalue.setValue({fieldId:'location',value:2});
    //     // revalue.selectNewLine({
    //     //     sublistId:'costcomponent'
    //     // });
    //     revalue.setSublistValue({
    //         sublistId:'costcomponent',
    //         fieldId:'cost',
    //         line:1,
    //         value:5999
    //     });
    //     revalue.setSublistValue({
    //         sublistId:'costcomponent',
    //         fieldId:'amount',
    //         line:1,
    //         value:1800
    //     });
    //     revalue.setSublistValue({
    //         sublistId:'costcomponent',
    //         fieldId:'costcategory',
    //         line:1,
    //         value:3
    //     });
        
    //     // revalue.commitLine({
    //     //     sublistId:'costcomponent'
    //     // });
    //     try{
    //         var revalueId=revalue.save();
    //     }catch(error)
    //     {
    //         log.error({
    //             title:"revalue inventory item can not be done",
    //             details:error.message
    //         })
    //     }
    //  }
    //  function createPurchaseOrder()
    //  {
    //      try{
    //         var purchaseOrder=record.create({
    //             type:'purchaseorder',
    //             isDynamic:true
    //         });
    //         purchaseOrder.setValue({fieldId:'entity',value:1305});
    //         purchaseOrder.setValue({fieldId:'trandate',value:new Date('12/30/2021')});
    //         purchaseOrder.setValue({fieldId:'subsidiary',value:1});
    //         purchaseOrder.setValue({fieldId:'location',value:2});
    //         purchaseOrder.selectNewLine({
    //            sublistId:'item'
    //        });
    //        purchaseOrder.setCurrentSublistValue({
    //            sublistId:'item',
    //            fieldId:'item',
    //            value:2114
    //        });
    //        purchaseOrder.setCurrentSublistValue({
    //            sublistId:'item',
    //            fieldId:'amount',
    //            value:5999
    //        });
    //        purchaseOrder.setCurrentSublistValue({
    //            sublistId:'item',
    //            fieldId:'quantity',
    //            value:1
    //        });
    //        purchaseOrder.commitLine({
    //            sublistId:'item'
    //        });
    //        var purchaseId=purchaseOrder.save();
    //        return purchaseId;
    //      }
    //      catch(error)
    //      {
    //         log.error({
    //             title:"purchase order not created",
    //             details:error.message
    //         })
    //      }
    //  }
     function createSalesOrder()
     {
         try{
            var salesOrder=record.create({
                type:record.Type.SALES_ORDER,
                isDynamic:true,
                defaultValues:{
                    entity:26157
                }
            });
            // salesOrder.setValue({fieldId:'entity',value:26157});
            salesOrder.setValue({fieldId:'subsidiary',value:1});
            salesOrder.setValue({fieldId:'orderstatus',value:'B'});
            salesOrder.selectNewLine({
                sublistId:'item'
            });
            salesOrder.setCurrentSublistValue({sublistId:'item',fieldId:'item',value:2115});
            salesOrder.setCurrentSublistValue({sublistId:'item',fieldId:'taxcode',value:-153});
            salesOrder.setCurrentSublistValue({sublistId:'item',fieldId:'amount',value:5999});
            salesOrder.setCurrentSublistValue({sublistId:'item',fieldId:'quantity',value:1});
            salesOrder.commitLine({sublistId:'item'});
            var salesId=salesOrder.save({
                ignoreMandatoryFields:true
            });
         }catch(error)
         {
            log.error({
                            title:"sales order not created",
                            details:error.message
                        })
         }
     }
     return {
         onRequest:createSalesOrder
     };
 })