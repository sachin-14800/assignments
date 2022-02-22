function createRecord(){
    $$.logExecution("DEBUG",'TestRec','So it begins');
    var record=new $R({
        nlobjRecordType:"customer",
        nlobjFieldIds:{
            internalid:1234, //it will load the record
            isperson:true,
            firstname:"Sachin",
            lastname:"Gupta",
            email:"abcd@gmail.com",
            subsidiary:1
        },
        nlobjSublistIds:{
            addressbook:[{
                linenum:1,
                city:"city1",
                state:"CA",
                country:"US",
                defaultbilling:true,
                defaultshipping:false
            }]
        }
    });
    record.set("phone",'986790');
    var recId=record.save();
}

var order=new $R({
    nlobjRecordType:"salesorder",
    nlobjFieldIds:{
        transdate:"9/24/2011",
        entity:new $R({
            nlobjRecordType:"customer",

        })
    }
})