import Map from 'src/map'
import G from 'src/models/G';
import Line from 'src/models/Line';
import Lines from 'src/models/Lines';

let m = new Map('app')

let g_0 = new G()
let g_1 = new G({
  stroke: true,
  c: 'rgba(255, 255, 0, .7)'
})

let l_1 = new Line({
  p1: [0, 0],
  p2: [0, 0],
  c: 'rgba(255, 255, 0, .7)'
})
let l_2 = new Line({
  p1: [m.w, 0],
  p2: [0, 0],
  c: 'rgba(255, 255, 0, .7)'
})
let l_3 = new Line({
  p1: [0, 0],
  p2: [0, 0],
  c: 'rgba(255, 255, 0, .7)'
})
let l_4 = new Line({
  p1: [0, m.h],
  p2: [0, 0],
  c: 'rgba(255, 255, 0, .7)'
})
g_0.add(l_1, l_2, l_3, l_4)


for(let i = 0; i < 100; i++) {
  const perW = m.w / Math.sqrt(100)
  const perH = m.h / Math.sqrt(100)
  const margin = Math.sqrt(100) / 2
  let g_1 = new G({
    left: i % Math.sqrt(100) * perW + margin,
    top: Math.floor(i / Math.sqrt(100)) * perH + margin,
    w: perW - margin * 2,
    h: perH - margin * 2,
    fill: true,
    onFocus: function() {
      this.c = 'rgba(0, 0, 255, .3)'
    }
  })
  m.add(g_1)
  m.observerList.push(g_1)
}

m.add(g_0)
m.render()
m.addEventListener('mousemove', function() {
  m.remove(g_1)
  l_3.p1[0] = l_3.p2[0] = l_4.p1[0] = l_4.p2[0] = m.mouse.x
  l_1.p1[1] = l_1.p2[1] = l_2.p1[1] = l_2.p2[1] = m.mouse.y
  if(m.focus) {
    // 边框
    g_1.left = m.focus.left - 10
    g_1.top = m.focus.top - 10
    g_1.w = m.focus.w + 20
    g_1.h = m.focus.h + 20
    m.add(g_1)
    // 线条
    l_1.p2[0] = g_1.left
    l_2.p2[0] = g_1.left + g_1.w
    l_3.p2[1] = g_1.top
    l_4.p2[1] = g_1.top + g_1.h
  } else {
    l_1.p2[0] = m.mouse.x
    l_2.p2[0] = m.mouse.x
    l_3.p2[1] = m.mouse.y
    l_4.p2[1] = m.mouse.y
  }
})