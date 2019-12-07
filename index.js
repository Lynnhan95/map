const fs = require('fs');
const d3 = require('d3');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const hull = require('hull.js');
const horse13k = require('./horse13k');
const maxInscribed = require('./maxInscribed');
const insideCounter = require("./insideCounter")
const widthAdj = require("./widthAdj")
const func = require("./func")
const draw = require('./drawPhoenix')

const fakeDom = new JSDOM('<!DOCTYPE html><html><body></body></html>');

const outputLocation = './output.html';

let body = d3.select(fakeDom.window.document).select('body');

// Make an SVG Container
let svgContainer = body.append('div').attr('class', 'container')
  .append("svg")
    .attr("width", 1280)
    .attr("height", 1024);

//Draw samples 
let dots = svgContainer.selectAll("circle")
                      .data(horse13k)
                      .enter().append("circle")
                      .style("fill", "black")
                      .attr("r", 0.5)
                      .attr("cx", function(d,i){return d[0];})
                      .attr("cy", function(d,i){return d[1];});

// Compute a concave-hull 
let outline = hull(horse13k,20)

// the segment number (Notice: if the concave-hull is complicated, set the number higher)
// sliding window size
let segment = 10000;
let sliding = 100;

// Draw a path
var line0 = d3.line()
              .x(function(d) { return d[0]})
              .y(function(d) { return d[1]})
              .curve(d3.curveCatmullRomClosed);

var p = svgContainer.append("path")
                  .style("fill","none")
                  .style("stroke","blue")
                  .style("stroke-width","1px")
                  .attr("d",line0(outline));

// create clip mask 
var clipPolygon = svgContainer.append("clipPath")
      .attr("id", "polygon-clip")
      .append("path")
      .attr("d", line0(outline));


var path = p.node();
var divs = new maxInscribed(path,segment)
var outlineDic = divs.newptsList
var dataDic = horse13k.map(item=>{return {x:item[0],y:item[1]}})
var counterL = insideCounter(divs.dictAllmin,outlineDic,dataDic)
var result = new widthAdj(counterL,sliding,segment,divs.gadget,2)

// draw the map
draw(outlineDic,result.widthResult,svgContainer,segment);



// let dots = svgContainer.selectAll("circle")
//                       .data(divs)
//                       .enter().append("circle")
//                       .style("fill", "red")
//                       .attr("r", 2)
//                       .attr("cx", function(d,i){return d.x;})
//                       .attr("cy", function(d,i){return d.y;});

// let testCircles = svgContainer.selectAll("circle")
//                       .data(divs)
//                       .enter().append("circle")
//                       .style("fill", "none")
//                       .style("stroke", "red")
//                       .style("stroke-width", "1px")
//                       .attr("r", function(d,i){return d.radius;})
//                       .attr("cx", function(d,i){return d.centerX;})
//                       .attr("cy", function(d,i){return d.centerY;});

// Output the result to console
// console.log(body.select('.container').html());

// Output the result to file
fs.writeFileSync(outputLocation, body.select('.container').html());