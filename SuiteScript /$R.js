function createRecord(){
    $$.logExecution("DEBUG",'TestRec','So it begins');
    var record=new $R({
        nlobjRecordType:"customer",
        nlobjFieldIds:{
            isperson:true,
            firstname:"Sachin",
            lastname:"Gupta",
            email:"abcd@gmail.com",
            subsidiary:1
        }
    });
    record.set("phone",'986790');
    var recId=record.save();
    var item=new $R({
        nlobjRecordType:"inventoryitem",
        nlobjFieldIds:{
            itemid:"Keyboard",
            subsidiary:"Honeycomb Holdings Inc.",
            cost:2999
        },
        submitRecordOptions:{
            ignoreMandatoryFields:true
        }

    });
}

//celigo_basis.closure.js

