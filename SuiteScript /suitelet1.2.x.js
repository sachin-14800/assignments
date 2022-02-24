/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */

define(['N/record','N/log'],
    function(record,log)
    {
        function helper()
        {
            try{
                var customer=record.load({
                    type:'customer',
                    id:25326,
                });
                var phone=customer.getValue({
                    fieldId:'phone'
                });
                customer.setValue({
                    fieldId:'custentity25',
                    value:phone
                });
                var customerId=customer.save();
            }catch(error)
            {
                log.error({
                    title:"Contact sync error",
                    details:error.message
                })
            }
        }
        return {
            onRequest:helper
        };
    })