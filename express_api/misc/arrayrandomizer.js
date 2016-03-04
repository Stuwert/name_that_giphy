module.exports = function(){
  var newArr = [], oldArray = this;
  while(oldArray.length > 0){
    newArr.push(oldArray.splice(randomNumberToIndex(oldArray.length), 1)[0])
  }
  return newArr;
}


function randomNumberToIndex(i){
  return Math.trunc(Math.random() * i);
}
