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
  top: 100,
  w: m.w - 150,
  h: 400,  
  data: []
})

let start = 2800
let data_1 = Array.apply(null, {length: 241}).map(item => {
  return start += Math.random() * (start * .003) - start * .0015
})

let _data = Array.apply(null, {length: 241}).map(item => {
  return Math.random() * 500 + 500
})

rc_1.update(data_1)

let t_1 = new temp({
  left: 100,
  top: 500,  
  w: m.w - 150,
  h: 200,
  data: _data
})

g.add(rc_1)
g.add(t_1)

m.add(g)
m.render()
