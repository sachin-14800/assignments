function afterSubmit(){
    var newRecord = nlapiGetNewRecord();
    // nlapiLogExecution('Debug','Message',newRecord.getFieldValue('entity'));
    var customer=nlapiLoadRecord('customer',newRecord.getFieldValue('entity'));
    // nlapiLogExecution("Debug","message",customer.getFieldValue('email'));
    var fromId = -5;
    var toEmail = customer.getFieldValue('email');
    var subject = 'New order is created';
    var msg = 'Your order with the following items is created:';
    
    var record_file = nlapiPrintRecord('TRANSACTION',newRecord.getFieldValue('id'), 'PDF', null);

    nlapiSendEmail(fromId, toEmail, subject, msg, null, null, null,record_file);
}