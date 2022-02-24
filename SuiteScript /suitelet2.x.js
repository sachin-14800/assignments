function createOrder()
{
    var salesorder=record.create({
        type:record.Type.SALES_ORDER,
        isDynamic:true,
        defaultValues:{
            entity:26156
        }
    });
    salesorder.setValue({fieldId:'trandate',value:new Date('12/30/2021')});

    var subrec=salesorder.getSubrecord({
        fieldId:'shippingaddress'
    });
    subrec.setValue({fieldId:'addr1',value:'123 street'});
    subrec.setValue({fieldId:'city',value:'city'});
    subrec.setValue({});


    salesorder.selectNewLine({
        sublistId:'item'
    });
    salesorder.setCurrentSublistValue({
        sublistId:'item',
        fieldId:'item',
        value:'123'
    });
    salesorder.setCurrentSublistValue({
        sublistId:'item',
        fieldId:'quantity',
        value:1
    });
    salesorder.setCurrentSublistValue({
        sublistId:'item',
        fieldId:'rate',
        value:200
    })
    salesorder.commitLine({
        sublistId:'item'
    });

    try{
        var id=salesorder.save({
            ignoreMandatoryFields:false
        });
        log.debug('record id',id);
        return id;
    }
    catch(err)
    {
        return 0;
    }
}