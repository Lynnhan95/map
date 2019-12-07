var func = require('./func')

module.exports = function widthAdj (counterL,sliding,segment_num,gadget,factor){

    var countDensity = counterL[0]
    var countInteger = counterL[1]
    var countArea = counterL[2]

    //sliding the density
    this.densityMulti =  func.slidingCalSum(gadget,segment_num,sliding,countDensity);

    //sliding calculate the counts integers
    this.integerMulti =  func.slidingCalSum(gadget,segment_num,sliding,countInteger);

    //sliding calculate the area
    this.areaMulti =  func.slidingCalSum(gadget,segment_num,sliding,countArea);

    this.widthResult = func.weightedMean(this.densityMulti,countArea,sliding)

    this.widthResult = this.widthResult.map(function(i){  if (i ==0) {i=0.1}  i = i*factor;return i;})

}