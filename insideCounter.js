var func = require('./func')

module.exports = function insideCounter (centerDict,curvePtList,dotsList){
        var inside_point_density_list = [];
        var inside_point_numb_list = [];
        var poly_list = []
        var area_list=[]
      
          for (var i = 0; i < curvePtList.length; i++) {
            var center1 = {x:centerDict[i].centerX, y:centerDict[i].centerY}
            var pt1 = {x:curvePtList[i].x,y:curvePtList[i].y }
      
            var center2,pt2;
            if (i !== curvePtList.length-1) {
              center2 = {x:centerDict[i+1].centerX, y:centerDict[i+1].centerY}
              pt2     = {x:curvePtList[i+1].x,y:curvePtList[i+1].y}
            }
            if (i === curvePtList.length-1 ) {
            center2 = {x:centerDict[0].centerX, y:centerDict[0].centerY}
              pt2   = {x:curvePtList[0].x,y:curvePtList[0].y}
            }
      
            var polygon = [pt1,pt2,center2,center1]
      
            poly_list.push(polygon)
      
            var counter = 0;
      
            for (var j = 0; j < dotsList.length; j++) {
              if (func.inside(dotsList[j],polygon)==true) {
                counter ++ ;
              }
            }
            if (i == curvePtList.length-1 ) {
              var area = func.getArea(curvePtList[i],curvePtList[0],centerDict[i],centerDict[0])
              area_list.push(area)
            }
            else {
              var area= func.getArea(curvePtList[i],curvePtList[i+1],centerDict[i],centerDict[i+1])
              area_list.push(area)
            }
      
            var density =  counter/ area
            inside_point_density_list.push(density);
            inside_point_numb_list.push(counter);
          }

      
          return [inside_point_density_list,inside_point_numb_list,area_list];
      
    }