export function GetDistance(x1,y1,x2,y2){
  return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2))
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