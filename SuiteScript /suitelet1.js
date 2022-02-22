function run(request,response)
{
    var customer=nlapiLoadRecord('customer','25326');
    var phone=customer.getFieldValue('phone');
    nlapiLogExecution('Audit','Phone Number',phone);
    customer.setFieldValue('custentity25',phone);
    nlapiSubmitRecord(customer,true);
}