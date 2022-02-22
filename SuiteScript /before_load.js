function beforeLoad(type,form){
    var value=nlapiGetFieldValue('entityname');
    nlapiLogExecution("Debug","name",value);
    form.addButton('custpage_Update_customer','Update customer',"nlapiSetFieldValue('custbody26',nlapiGetFieldValue('entityname'))");
}