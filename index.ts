import Map from 'src/Map'
import PolyCoordinate from 'models/PolyCoordinate'
import G from 'models/G'
import Line from 'models/Line'
import Pentagram from 'models/Pentagram'

/* 测试 */
let m = new Map('app', 2)
let g = new G()

m.add(g)
console.log(g)
m.render()
