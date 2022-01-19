const fs=require('fs');
const async=require('async');
const path=require('path');
const download=require('download');
const arr=[
    "https://cdn.vox-cdn.com/thumbor/SXZUSV2LUllOzJmtOkk0vSBkveQ=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19662507/MV5BMDQ3ZWNmYzYtMzY2MS00MjMxLWE4MjAtNDdkOTQ5NzQ5OTUyXkEyXkFqcGdeQXVyNTQxOTM1NTc_._V1_SY1000_CR0_0_1502_1000_AL_.jpg",
    "https://doodleart.redbull.com/assets/managed/entries/processed/sm/367010617181759_36211000.jpg",
    "https://www.justcolor.net/wp-content/uploads/sites/1/nggallery/doodle-art-doodling/coloring-page-adults-doodle-art-rachel.jpg",
    "https://i.pinimg.com/originals/e5/55/a3/e555a39ca5457a079a9bcce59f61f8d5.jpg",
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/b6037c93472227.5e6769f0d9af7.png",
    "https://i.pinimg.com/originals/ef/4c/91/ef4c91fb73e61e19211a0589187ccaa6.jpg",
    "https://static.vecteezy.com/system/resources/previews/000/107/464/non_2x/huge-doodle-vector-pack.jpg",
    "https://i.ytimg.com/vi/O5u1apUkYV0/maxresdefault.jpg",
    "https://media.glassdoor.com/l/e9/c1/7a/84/independence-day-celebration.jpg",
    ];

let num=0;
let dir="folder0";
if(!fs.existsSync(dir))
    fs.mkdirSync(dir);
    async.parallel([
       function(){
        arr.forEach(async (element)=>{
            if(fs.readdirSync(dir).length>=4)
            {
                while(fs.readdirSync(dir).length>4)
                {   num++;
                    dir=`folder${num}`;
                    if(!fs.existsSync(dir))
                        fs.mkdirSync(dir);
                }
            }
            

            download(element).pipe(fs.createWriteStream(`${dir}/image${arr.indexOf(element)+1}.jpg`)); 
            
        });
       } 
    ]).then(results=>{
        console.log(results);
    }).catch(err=>
    {
        console.log(`Error is ${err}`);
    });