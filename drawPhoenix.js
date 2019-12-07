const d3 = require('d3');
const hull = require('hull.js');
const horse13k = require('./horse13k');
const maxInscribed = require('./maxInscribed');
const insideCounter = require("./insideCounter")
const widthAdj = require("./widthAdj")

module.exports= function drawPhoenix (data,svg,segment_num,color,sliding,weightFac,hullFac,className,maskId){

    // Compute a concave-hull
    let outline = hull(data,hullFac)

    // the segment number (Notice: if the concave-hull is complicated, set the number higher)
    // sliding window size

    // Draw a path
    var line0 = d3.line()
                  .x(function(d) { return d[0]})
                  .y(function(d) { return d[1]})
                  .curve(d3.curveCatmullRomClosed);
    var group = svg.append('g').attr("class",className)

    // the para is changable for the shape of the curves
    var p = group.append("path")
                      .style("fill","none")
                      .style("stroke","none")
                      .style("stroke-width","1px")
                      .attr("d",line0(outline,0.5));

    // create clip mask
    var clipPolygon = group.append("clipPath")
          .attr("id", maskId)
          .append("path")
          .attr("d", line0(outline));


    var path = p.node();
    var divs = new maxInscribed(path,segment_num)

    var outlineDic = divs.newptsList
    var dataDic = data.map(item=>{return {x:item[0],y:item[1]}})


    var counterL = insideCounter(divs.dictAllmin,outlineDic,dataDic)
    var result = new widthAdj(counterL,sliding,segment_num,divs.gadget,weightFac)

    var index =  0 ;

    while (index<(segment_num-1)) {

      var temp_pt_0 = [];
      var temp_pt_1 = [];
      var temp_pt_2 = [];

      var arc_pts   = [];
      if (index == (segment_num-2)) {
        temp_pt_0 = [outlineDic[segment_num-2].x,outlineDic[segment_num-2].y];
        temp_pt_1 = [outlineDic[segment_num-1].x,outlineDic[segment_num-1].y];
        temp_pt_2 = [outlineDic[0].x,outlineDic[0].y];
        arc_pts=[temp_pt_0,temp_pt_1,temp_pt_2]
        generateArcs(arc_pts,index);
        temp_pt_0 = [outlineDic[segment_num-1].x,outlineDic[segment_num-1].y];
        temp_pt_1 = [outlineDic[0].x,outlineDic[0].y];
        temp_pt_2 = [outlineDic[1].x,outlineDic[1].y];
        arc_pts=[temp_pt_0,temp_pt_1,temp_pt_2]
        generateArcs(arc_pts,index);

      }
      else {

        temp_pt_0 = [outlineDic[index].x,outlineDic[index].y];
        temp_pt_1 = [outlineDic[index+1].x,outlineDic[index+1].y];
        temp_pt_2 = [outlineDic[index+2].x,outlineDic[index+2].y];
        arc_pts=[temp_pt_0,temp_pt_1,temp_pt_2]
        generateArcs(arc_pts,index);
      }
          index = index  +2;

    }

    function generateArcs(arc_pts,index) {

      var lineGenerator = d3.line()
                            .curve(d3.curveCardinalClosed);
      var pathData = lineGenerator(arc_pts);
      var stroke_wid = result.widthResult[index]

      group.append('path')
              .style("stroke",color)
              .style("stroke-opacity", "1")
              .style("fill","black")
              .style("opacity","0.3")
              .style("stroke-width",stroke_wid)
              .attr("clip-path", "url(#"+maskId+")")
              .attr('d', pathData);
    }
}
