function Rad(d){
  return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
}

export function GetDistance(lng1,lat1,lng2,lat2){
  var radLat1 = Rad(lat1);
  var radLat2 = Rad(lat2);
  var a = radLat1 - radLat2;
  var  b = Rad(lng1) - Rad(lng2);
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
  s = s*6378.137 ;
  s = Math.round(s * 10000) / 10000000; 
  return s;
}

export function findMaxAndMin (arr) {
  let max = 0, min = 0
  arr.map((item, index) => {
    if (index === 0) min = item
    if (item > max) max = item
    if (item < min) min = item
  })
  return {
    max,
    min
  }
}

export function getVerticalLen (a, b ,c) {
  let p = (a+b+c)/2
  let S = Number(Math.sqrt(p*(p-a)*(p-b)*(p-c)).toFixed(2))
  let len = S / (b*2)
  return len.toFixed(2)
}