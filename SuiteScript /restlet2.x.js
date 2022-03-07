/**
 *@NApiVersion 2.x
 *@NScriptType Restlet
 */

 define(['N/record','N/error','N/search'],
    function(record,error,search)
    {
        function _post(context)
        {
            // var mySearch=search.create({
            //     type:'salesorder',
            //     filters:[
            //         ['status','is','SalesOrd:F']
            //     ],
            //     columns:[
            //         search.createColumn({name:'total',label:'total'}),
            //         search.createColumn({name:'tranid',label:'tranid'})
            //     ]
            // });
            var mySearch=search.load('81414');
            var resultSet=mySearch.run();
            var results=resultSet.getRange(0,1000);
            for(var i in results)
            {
                var result=results[i];
                for(var k in result.columns)
                {
                    log.debug('Result is'+result.getValue(result.columns[k]));
                }
            }
            
            return JSON.stringify({name:"Sachin"});
        }
        return{
            post:_post
        };
    });