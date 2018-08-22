import Map from 'src/Map'
import PolyCoordinate from 'models/PolyCoordinate'
import Rec from 'models/RectCoordinate'
import G from 'models/G'
import Line from 'models/Line'
import Pentagram from 'models/Pentagram'
import temp from 'models/temp'

/* 测试 */
let m = new Map('app', 2)
let g = new G()

let rc_1 = new Rec({
  left: 100,
  top: m.h / 10,
  w: m.w - 150,
  h: m.h / 2,  
  data: []
})

let start = 2800
let data_1 = []
let data_2 = []

rc_1.update(data_1)

let t_1 = new temp({
  left: 100,
  top: m.h/2 + m.h / 10,  
  w: m.w - 150,
  h: m.h * 3 / 10,
  data: []
})

g.add(rc_1)
g.add(t_1)

m.add(g)
const t = setInterval(function() {
  if (data_1.length >= 241 ) {
    return clearInterval(t)
  }
  data_1.push(start += Math.random() * (start * .003) - start * .0015)
  data_2.push(Math.random() * 500 + 500)
  rc_1.update(data_1)
  t_1.update(data_2)
  m.render()
}, 1000 / 12)
