var svgPath = require("svg-path-properties");
var minCircle = require("./minCircle");
var insideCounter = require("./insideCounter")


module.exports = function maxInscribed(path,segment_num) { 

    var data = path.getAttribute('d');
    // get the properties of this path
    var properties = svgPath.svgPathProperties(data);
    var pathLength = properties.getTotalLength();

    this.gadget = pathLength/segment_num;
    this.newptsList = [];

    // quarterly split the list to advoid max exceeding
    let dictAllmin1Q= [];
    let dictAllmin2Q= [];
    let dictAllmin3Q= [];
    let dictAllmin4Q= [];

    // divid the path
    for (var i = 0; i < segment_num; i++) {
        var point  = properties.getPointAtLength(i*this.gadget);
        this.newptsList.push(point)
      }
    
    for (var index = 0; index < segment_num/4; index++) {
        var result;
        result = minCircle(index,this.newptsList)
        dictAllmin1Q.push({index:index,radius:result[0],centerX:result[1],centerY:result[2]})
      }

    for (var index = segment_num/4; index < segment_num/2; index++) {
        var result;
        result = minCircle(index,this.newptsList)
        dictAllmin2Q.push({index:index,radius:result[0],centerX:result[1],centerY:result[2]})
      }
    
    for (var index = segment_num/2; index < 3*segment_num/4; index++) {
        var result;
        result = minCircle(index,this.newptsList)
        dictAllmin3Q.push({index:index,radius:result[0],centerX:result[1],centerY:result[2]})
      }

    for (var index = 3*segment_num/4; index < segment_num; index++) {
        var result;
        result = minCircle(index,this.newptsList)
        dictAllmin4Q.push({index:index,radius:result[0],centerX:result[1],centerY:result[2]})
      }
    
    this.dictAllmin = dictAllmin1Q.concat(dictAllmin2Q,dictAllmin3Q,dictAllmin4Q)
    
    // return inscribed circle centers list and the list of the new div points on the outline

};