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

    let s_ot_Inf = []
    let s_on_Inf = []
    let s_ts_Inf = []
    let e_zt_Inf = []
    let e_oz_Inf = []
    let e_oe_Inf = []
    let e_tf_Inf = []
    let n_zt_Inf = []
    let n_oz_Inf = []

    let s_ot_Mot = []
    let s_on_Mot = []
    let s_ts_Mot = []
    let e_zt_Mot = []
    let e_oz_Mot= []
    let e_oe_Mot = []
    let e_tf_Mot = []
    let n_zt_Mot = []
    let n_oz_Mot = []



    // read csv as json
    // IMPORTANT! scale the dataset
    for (var i = 0; i < jsonObj.length; i++){

        var obj = jsonObj[i];
        var x = Math.round(Number(obj.POINT_X) * 1000) / 100;
        var y = Math.round(Number(obj.POINT_Y) * 1000) / 100;

        x = Math.round((x*8-2000)*100)/100
        y = Math.round((y*8-3800)*100)/100 -350

        //case one
        if (obj.MDY.substring(0, 4)== "7/12") {
          if (obj.SubType=="Inf_Div") {
            s_ot_Inf.push([x,y])
          }
          else {
            s_ot_Mot.push([x,y])
          }
        }
        //case two
        if (obj.MDY.substring(0, 4)== "7/19") {
          if (obj.SubType=="Inf_Div") {
            s_on_Inf.push([x,y])
          }
          else {
            s_on_Mot.push([x,y])
          }
        }
        //case three
        if (obj.MDY.substring(0, 4)== "7/26") {
          if (obj.SubType=="Inf_Div") {
            s_ts_Inf.push([x,y])
          }
          else {
            s_ts_Mot.push([x,y])
          }
        }

        //case 4
        if (obj.MDY.substring(0, 4)== "8/10") {
          if (obj.SubType=="Inf_Div") {
            e_oz_Inf.push([x,y])
          }
          else {
            e_oz_Mot.push([x,y])
          }
        }
        //case 5
        if (obj.MDY.substring(0, 4)== "8/2/") {
          if (obj.SubType=="Inf_Div") {
            e_zt_Inf.push([x,y])
          }
          else {
            e_zt_Mot.push([x,y])
          }
        }
        //case 6
        if (obj.MDY.substring(0, 4)== "8/18") {
          if (obj.SubType=="Inf_Div") {
            e_oe_Inf.push([x,y])
          }
          else {
            e_oe_Mot.push([x,y])
          }
        }

        // case 7
        if (obj.MDY.substring(0, 4)== "8/24") {
          if (obj.SubType=="Inf_Div") {
            e_tf_Inf.push([x,y])
          }
          else {
            e_tf_Mot.push([x,y])
          }
        }

        //case 8
        if (obj.MDY.substring(0, 4)== "9/2/") {
          if (obj.SubType=="Inf_Div") {
            n_zt_Inf.push([x,y])
          }
          else {
            n_zt_Mot.push([x,y])
          }
        }

        //case 9
        if (obj.MDY.substring(0, 4)== "9/10") {
          if (obj.SubType=="Inf_Div") {
            n_oz_Inf.push([x,y])
          }
          else {
            n_oz_Mot.push([x,y])
          }
        }
    }

/*
    // this is for generating an empty html file from scretch
    const fakeDom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    let body = d3.select(fakeDom.window.document).select('body');
    console.log(body);
*/

   JSDOM.fromFile('index.html')
        .then((dom) => {

          let html = d3.select(dom.window.document)
          const outputLocation = './d_index.html';
          // Make an SVG Container
          let svgContainer = html.select("#firstWindow").append('div').attr('id', 'infantry')
              .append("svg")
              .attr("width", 800)
              .attr("height", 600);

          let svgContainer2 = html.select("#secondWindow").append('div').attr('id', 'mot')
              .append("svg")
              .attr("width", 800)
              .attr("height", 600);

          let svgContainer3 = html.select("#thirdWindow").append('div').attr('id', 'both')
              .append("svg")
              .attr("width", 800)
              .attr("height", 600);

          //Draw samples
          // let dots = svgContainer.selectAll("circle")
          //                       .data(sep)
          //                       .enter().append("circle")
          //                       .style("fill", "black")
          //                       .attr("r", 0.5)
          //                       .attr("cx", function(d,i){return d[0];})
          //                       .attr("cy", function(d,i){return d[1];});

          var colorscheme1 ="#a6cee3"
          var colorscheme2 ="#1f78b4"
          var colorscheme3 ="#b2df8a"
          var colorscheme4 ="#33a02c"
          var colorscheme5 ="#fb9a99"
          var colorscheme6 ="#e31a1c"
          var colorscheme7 ="#fdbf6f"
          var colorscheme8 ="#ff7f00"
          var colorscheme9 ="#cab2d6"
          let segment = 3000;
          let sliding = 150;
          let wf = 30;
          let hf = 180;


          // draw the map of InF Div
          draw(s_ot_Inf,svgContainer,segment,colorscheme1,sliding,wf,hf,"1","m1");
          draw(s_on_Inf,svgContainer,segment,colorscheme2,sliding,wf,hf,"2","m2");
          draw(s_ts_Inf,svgContainer,segment,colorscheme3,sliding,wf,hf,"3","m3");
          draw(e_zt_Inf,svgContainer,segment,colorscheme4,sliding,wf,hf,"4","m4");
          draw(e_oz_Inf,svgContainer,segment,colorscheme5,sliding,wf,hf,"5","m5");
          draw(e_oe_Inf,svgContainer,segment,colorscheme6,sliding,wf,hf,"6","m6");
          draw(e_tf_Inf,svgContainer,segment,colorscheme7,sliding,wf,hf,"7","m7");
          draw(n_zt_Inf,svgContainer,segment,colorscheme8,sliding,wf,hf,"8","m8");
          draw(n_oz_Inf,svgContainer,segment,colorscheme9,sliding,wf,hf,"9","m9");


          // draw the map of Mot Div
          draw(s_ot_Mot,svgContainer2,segment,colorscheme1,sliding,wf,hf,"1","m1");
          draw(s_on_Mot,svgContainer2,segment,colorscheme2,sliding,wf,hf,"2","m2");
          draw(s_ts_Mot,svgContainer2,segment,colorscheme3,sliding,wf,hf,"3","m3");
          draw(e_zt_Mot,svgContainer2,segment,colorscheme4,sliding,wf,hf,"4","m4");
          draw(e_oz_Mot,svgContainer2,segment,colorscheme5,sliding,wf,hf,"5","m5");
          draw(e_oe_Mot,svgContainer2,segment,colorscheme6,sliding,wf,hf,"6","m6");
          draw(e_tf_Mot,svgContainer2,segment,colorscheme7,sliding,wf,hf,"7","m7");
          draw(n_zt_Mot,svgContainer2,segment,colorscheme8,sliding,wf,hf,"8","m8");
          draw(n_oz_Mot,svgContainer2,segment,colorscheme9,sliding,wf,hf,"9","m9");


          // draw the map of Both Div
          draw(s_ot_Inf.concat(s_ot_Mot),svgContainer3,segment,colorscheme1,sliding,wf,hf,"1","m1");
          draw(s_on_Inf.concat(s_on_Mot),svgContainer3,segment,colorscheme2,sliding,wf,hf,"2","m2");
          draw(s_ts_Inf.concat(s_ts_Mot),svgContainer3,segment,colorscheme3,sliding,wf,hf,"3","m3");
          draw(e_zt_Inf.concat(e_zt_Mot),svgContainer3,segment,colorscheme4,sliding,wf,hf,"4","m4");
          draw(e_oz_Inf.concat(e_oz_Mot),svgContainer3,segment,colorscheme5,sliding,wf,hf,"5","m5");
          draw(e_oe_Inf.concat(e_oe_Mot),svgContainer3,segment,colorscheme6,sliding,wf,hf,"6","m6");
          draw(e_tf_Inf.concat(e_tf_Mot),svgContainer3,segment,colorscheme7,sliding,wf,hf,"7","m7");
          draw(n_zt_Inf.concat(n_zt_Mot),svgContainer3,segment,colorscheme8,sliding,wf,hf,"8","m8");
          draw(n_oz_Inf.concat(n_oz_Mot),svgContainer3,segment,colorscheme9,sliding,wf,hf,"9","m9");

          // Output the result to file
          fs.writeFileSync(outputLocation,dom.serialize());

          // launch server and visualize
          const html_server = new server(outputLocation)
        });

})
