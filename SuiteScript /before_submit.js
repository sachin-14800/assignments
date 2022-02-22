function beforeSubmit(){
    var newRecord=nlapiCreateRecord("customrecord1146");
    newRecord.setFieldValue('custrecord1421',nlapiGetFieldValue('entity'));
    newRecord.setFieldValue('name',nlapiGetFieldValue('entityname'));
    newRecord.setFieldValue('custrecord1422',nlapiGetFieldValue('id'));
    var columns=[];
    columns.push(new nlobjSearchColumn('custrecord1422'));
    var searchresults=nlapiSearchRecord('customrecord1146',null,[],columns);
    for(var i=0;searchresults!=null && i<searchresults.length;i++)
    {
        if(searchresults[i].getValue('custrecord1422')==nlapiGetFieldValue('id'))
        return;
    }
    nlapiSubmitRecord(newRecord);
}