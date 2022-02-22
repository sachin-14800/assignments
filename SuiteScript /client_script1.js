function fieldChange(type,name)
{
    nlapiLogExecution("Audit","message",name);
    if(name==="phone")
    {
        nlapiLogExecution("Audit","message","hello");

        nlapiSetFieldValue('custentity',nlapiGetFieldValue('phone'));
    }
    alert('field is changed');
    
    nlapiLogExecution("Audit","message","phone field is set");
}
function saveRecord() 
{
    alert("Record is saved");
    nlapiLogExecution("Audit","message","Record is saved");
    return true;

}
function recalc(type,action)
{
 alert("recalc function is called");
}