const fs=require('fs');
const path=require('path');
const parse=require('xml-parser');

parsetojson=(filePath)=>{
    let xmlFile;
    try{
        xmlFile=fs.readFileSync(filePath,'utf8');
    }
    catch(err){
        console.log(`Error is ${err}`);
        return;
    }
        return parse(xmlFile);
    
}
console.log(parsetojson('../q2/file.xml'));