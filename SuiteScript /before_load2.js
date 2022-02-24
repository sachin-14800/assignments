/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */

 define ( ['N/record', 'N/ui/serverWidget'],

    function(record,serverWidget)
    {
        function beforeLoad(context)
        {
            if (context.type !== context.UserEventType.CREATE)
                return;
                log.debug({
                    title:"completed successfully",
                    details:"Hello"
                });
            // var newrecord=context.newRecord;
            var value=context.newRecord.getValue({
                fieldId:'entityname',
            });
            var form=context.form;
            var button=form.addButton({
                id:'custpage_Update_customer',
                label:'Update customer',
                functionName:context.newRecord.setValue({
                    fieldId:'custbody26',
                    value:value
                })
            });
            
        }
        function beforeSubmit(context)
        {
            if (context.type !== context.UserEventType.CREATE)
            return;
            var rec=context.newRecord;
        }
        function afterSubmit(context){
            if (context.type !== context.UserEventType.CREATE)
            return;
            var rec=context.newRecord;
            var customer=rec.getValue({
                fieldId:'entity'
            });
        }
    return {
        beforeLoad:beforeLoad,
        beforeSubmit:beforeSubmit
    };
    })
