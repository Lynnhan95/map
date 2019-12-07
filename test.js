const d3 = require('d3');
const csvFilePath='./MDXY.csv';
const csv=require('csvtojson');

// read the data 
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    let aug = []
    let jul = []
    let sep = []
    
    // read csv as json
    for (var i = 0; i < jsonObj.length; i++){
        var obj = jsonObj[i];
        obj.MDY.charAt(0) == "7"?jul.push(obj):obj.MDY.charAt(0) == "8"?aug.push(obj):sep.push(obj)
    }

    // split the data into three groups by month
})
