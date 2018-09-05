import Map from 'src/map'
import G from 'src/models/G';
import Line from 'src/models/Line';

function getTextPoints(txt):Array<[number, number]> {
  const gap = 13
  const M = document.createElement('canvas')
  document.getElementById('app').appendChild(M)
  const C = M.getContext('2d')
  M.height = 120
  M.width = 120 * 3 // C.measureText(txt).width + 20
  C.font="120px 宋体 bold"
  C.fillStyle = '#fff'  
  console.log( C.measureText(txt).width)
  C.textAlign = "left"
  C.textBaseline = "middle"
  C.fillText(txt, 0, M.height / 2)
  let _d = C.getImageData(0, 0, M.width, M.height)
  const points = []

  for(let i = 0; i < _d.data.length; i += (4 * gap)) {
    _d.data[i] === 255 && points.push(getCoord(i, M.width))
  }
  document.getElementById('app').removeChild(M)
  function getCoord(i, w) {
    i /= 4
    let _y = Math.floor(i / w)
    let _x = i - (_y * w)
    return [_x, _y]
  }
  return points
}

function getDistance(p1, p2) {
  return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2))
}
const TXT = '2018'
let points: Array<[number, number]> = getTextPoints(TXT).map(item => {
  const temp:[number, number] = [
    item[0] * 2.5,
    item[1] * 2.5
  ]
  return temp
})
let m = new Map('app')

let i = 0
const t = setInterval(function() {
  if(i >= points.length - 1) clearInterval(t)
  for(let j = 0, _l = points.length; j < _l; j++) {
    const distance = getDistance(points[i], points[j])
    if (Math.abs(points[i][0] - points[j][0]) > 17 || Math.abs(points[i][1] - points[j][1]) > 17 || points[i][0] === points[j][0] && points[i][1] === points[j][1] || distance > 17) continue
    const p1 =  points[i].map(item => { return item * 2.5})
    m.add(new Line({
      p1: points[i],
      p2: points[j],
      w: .5
    }))
  }
  m.render()
  i ++
}, 1000 / 24)

for(let i = 0; i< points.length; i++) {
  m.add(new G({
    left: points[i][0],
    top: points[i][1],
    w: 1,
    h: 1,
    c: '#ff0',
    fill: true
  }))  
}

m.render()