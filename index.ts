import Map from 'src/Map'
import Sharetime from 'models/Sharetime'
import Bar from 'models/Bar'

let m = new Map('app')

let data = []
let _p = 28.05
for(let i = 0; i< 241; i++) {
  const _r = Math.random()
  let _v = Math.round(_r * 300 * ((Math.random() < .5) ? 1 : -1)) * 100
  data.push([_p += ((_r - .5)), _v])
}

let t = new Sharetime({
  data,
  w: m.w,
  h: m.h
})

m.add(t)
m.render()
