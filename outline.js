
const hull = require('hull.js');
var d3 = require('d3');


function drawOutline(divElement,points) {
    const polygon = hull(points,20);
    var svg = d3.select(el).append('svg')
                            .attr("width",600)
                            .attr('height',600);
}

module.exports = drawOutline;
