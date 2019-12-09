const fs = require('fs');
const d3 = require('d3');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const horse13k = require('./horse13k');
const draw = require('./drawPhoenix')
const csvFilePath='./NEWDATA.csv';
const csv=require('csvtojson');
const server = require('./server');
const options = {
  contentType: 'text/html',
};


// read the data
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{

    let Projected_Points = []

    // read csv as json
    // IMPORTANT! scale the dataset
    for (var i = 0; i < jsonObj.length; i++){

        var obj = jsonObj[i];
        var x = Math.round(Number(obj.POINT_X) * 1000) / 100;
        var y = Math.round(Number(obj.POINT_Y) * 1000) / 100;


        //This part is suspicious. I dought that Junhan use this function to make projection. For some reason I can't test it. Please try to overwrite it with our code if possible. 
        x = Math.round((x*8-2000)*100)/100
        y = Math.round((y*8-3800)*100)/100 -350

        //Since our data have all categories with "7/12", we will only use one case here.(For Zhejiang)
        if (obj.MDY.substring(0, 4)== "7/12") {
            Projected_Points.push([x,y])
          }
        }
       
   JSDOM.fromFile('index.html')
        .then((dom) => {

          let html = d3.select(dom.window.document)
          const outputLocation = './d_index.html';
          // Make an SVG Container

          let svgContainer = html.select("#secondWindow").append('div').attr('id', 'path')
              .append("svg")
              .attr("width", 800)
              .attr("height", 600);

          var colorscheme ="#a6cee3"
          let segment = 3000;
          let sliding = 150;
          let wf = 30;
          let hf = 180;

          // draw the map of Mot Div
          draw(Projected_Points,svgContainer,segment,colorscheme,sliding,wf,hf,"1","path_1");

          // Output the result to file
          fs.writeFileSync(outputLocation,dom.serialize());

          // launch server and visualize
          const html_server = new server(outputLocation)
        });

})
