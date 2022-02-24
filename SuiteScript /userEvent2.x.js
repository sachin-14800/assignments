/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */

 define ( ['N/runtime', 'N/log','N/record','N/search','N/email','N/render'],

    function(runtime,log,record,search,email,render)
    {
        function beforeLoad(context)
        {
            try{
                const rec=context.newRecord;
                const form=context.form;
                const val=rec.getValue({
                    fieldId:'entityname',
                });
                var customer=record.load({
                    type:'customer',
                    id:rec.getValue({
                        fieldId:'entity'
                    })
                });
                form.addButton({
                    id:'custpage_update_customer',
                    label:'update',
                    functionName:'rec.setValue({fieldId:"custbody26",value:customer.getValue({fieldId:"entityname"})})'
                });
            }
            catch(error) {
            log.error({
                title: 'beforeLoad_addButton',
                details: error.message
            });
        }    
        }
        function beforeSubmit(context)
        {
            try{
                const rec=context.newRecord;
                const newRec=record.create({
                    type:'customrecord1146',
                });
                newRec.setValue({
                    fieldId:'custrecord1421',
                    value:rec.getValue({
                        fieldId:'entity'
                    })
                });
                newRec.setValue({
                    fieldId:'name',
                    value:rec.getValue({
                        fieldId:'entityname'
                    })
                });
                newRec.setValue({
                    fieldId:'custrecord1422',
                    value:rec.getValue({
                        fieldId:'id'
                    })
                });

                var mySearch=search.create({
                    type:'customrecord1146',
                    filters:[],
                    columns:[
                        search.createColumn({name:'custrecord1422',label:'custrecord1422'})
                    ]
                });

                var results=mySearch.run();
                for(var i=0;i<results.length;i++)
                {
                    if(results[i].getValue({fieldId:'custrecord1422'})==rec.getValue({fieldId:'id'}))
                        return;
                }
                var newRecId=newRec.save();
            }
            catch(error)
            {
                log.error({
                    title: 'beforeSubmit_createRecord',
                    details: error.message
                });
            }
        }
        function afterSubmit(context){
            try{
                var rec=context.newRecord;
                var customer=record.load({
                    type:'customer',
                    id:rec.getValue({
                        fieldId:'entity'
                    })
                });
                var subject="New order created";
                var msg = 'Your order with the following items is created:';
                var currentUser=runtime.getCurrentUser().id;
                var recipient=customer.getValue({
                    fieldId:'email'
                });
                var id=parseInt(rec.getValue({fieldId:'id'}));
                var attach=render.transaction({
                    entityId:id,
                    printMode:render.PrintMode.PDF,
                })
                email.send({
                    author:currentUser,
                    recipients:recipient,
                    subject:subject,
                    body:msg,
                    attachments:[attach],
                    relatedRecords:{
                        transactionId:id
                    }
                });
            }
            catch(error)
            {
                log.error({
                    title: 'afterSubmit_sendEmail',
                    details: error.message
                });
            }
        }
    return {
        beforeLoad:beforeLoad,
        beforeSubmit:beforeSubmit,
        afterSubmit:afterSubmit
    };
    })
