import Map from 'src/map'
import G from 'src/models/G';
import World from 'src/models/World';
import Line from 'src/models/Line';

function getDistance(p1, p2) {
  return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2))
}

let m = new Map('app')
let g_1 = new G()
m.add(g_1)

let s = new World({
  w: m.w,
  h: m.h
})
m.add(s)
let t
function x() {
  let i = 0
  g_1.clear()
  t = setInterval(function() {
    if(i >= s.wall.length - 1) clearInterval(t)
    let num = 0
    for(let j = 0, _l = s.wall.length; j < _l; j++) {
      const distance = getDistance(s.wall[i], s.wall[j])
      if (
        Math.abs(s.wall[i][0] - s.wall[j][0]) > 10
        || Math.abs(s.wall[i][1] - s.wall[j][1]) > 10
        || (s.wall[i][0] === s.wall[j][0] && s.wall[i][1] === s.wall[j][1])
        || distance > 10) continue
      if(num ++ > 15) break
      const p1: [number, number] = [s.wall[i][0] * 20 + 10, s.wall[i][1] * 20 + 10]  // .map((item) => { return item * 20})
      const p2: [number, number] = [s.wall[j][0] * 20 + 10, s.wall[j][1] * 20 + 10] // .map((item) => item * 20)
      g_1.add(new Line({
        p1: p1,
        p2: p2,
        c: 'rgba(0, 255, 255, .5)',
        w: .5
      }))
    }
    m.render()
    i ++
  }, 1000 / 12)
}

m.el.addEventListener('click', function(e) {
  console.log(e)
  s.addNode(e.x, e.y, m.dpr)
  clearInterval(t)
  x()
})

m.render()

