var func = require('./func');

function minCircle (pt_index,newpts_list){
    var pt1;
    var pt2;
    var radiusList = [];
    var radius_XList = [];
    var radius_YList = [];

    if (pt_index===newpts_list.length-1) {
      pt1=newpts_list[newpts_list.length-1]
      pt2 = newpts_list[0]
    }
    else {
      pt1=newpts_list[pt_index]
      pt2=newpts_list[pt_index+1]
    }

    for (var i = 0; i < newpts_list.length; i++) {
      var secondbnd = pt_index+1
        if (pt_index===newpts_list.length-1) {
          secondbnd = 0
        }
        if (i === pt_index||i===secondbnd) {
          continue;
          }
            var pt3 = newpts_list[i]
            // this circlePara will give three parameters regarding radius, and centerX, centerY
            var ciclePara = func.threePointsCircle(pt1,pt2,pt3);
            //
            radiusList.push(ciclePara[0])
            radius_XList.push(ciclePara[1])
            radius_YList.push(ciclePara[2])
    }
    var minRadius = func.findMinRadius(pt1,pt2,radiusList,radius_XList,radius_YList);
    var minIndex = radiusList.indexOf(minRadius)
    var p3_X = radius_XList[minIndex]
    var p3_Y = radius_YList[minIndex]

    return [minRadius,p3_X,p3_Y];

}

module.exports= minCircle;