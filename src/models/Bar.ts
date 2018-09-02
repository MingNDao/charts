import vNode from 'src/VNode'
import Painter from 'src/Painter'
import G from 'models/G';
import Line from 'models/Line';
import Text from 'models/Text'
import Lines from 'models/Lines'

const TAG = 'BAR'
interface bar {
  data?: Array<[number, number]>
  w?: number
  h?: number
  c?: string
  left?: number
  top?: number
}

/* 柱状图 */
export default class Bar extends vNode {
  pointers: Array<[number, number]>
  c: string
  w: number = 100
  h: number = 100
  left: number = 0
  top: number = 0
  data: Array<[number, number]> =  []
  maxY: number = 1000
  readonly length = 241
  constructor(obj: bar) {
    super(TAG)
    for(let x in obj) {
      this[x] = obj[x]
    }
    this.update(this.data)
  }
  get perW() {
    return this.w / this.length
  }
  update(data) {
    this.data = data
    const _data = data.map(item => Math.abs(item))
    this.maxY = Math.max.apply(Math, _data) * 1.3
  }
  coord(pointer: [number, number]) {
    const { maxY, h, perW} = this
    const perY = h / maxY
    let _x = pointer[0] + perW * .25
    let _y = h - pointer[1]  * perY
    return [_x, _y - 1]
  }  
}

Painter.reg(TAG, function(Bar){
  const { data, c = '#ff0', w, h, perW, left, top, maxY } = Bar
  const _self = this
  const offsetX = perW * .3
  const g = new G({
    left,
    top,
    w,
    h
  })
  // 创建坐标
  let rc = new Lines({
    pointers: [
      [0, 0],
      [0, h],
      [0 + w, h],
      [0 + w, 0]
    ],
    c: '#ddd',
    w: .3
  })
  g.add(rc)
  for(let i = 0; i < data.length; i++) {
    g.add(new Line({
      p1: Bar.coord([ perW * i + offsetX, 0]),
      p2: Bar.coord([ perW * i + offsetX, Math.abs(data[i])] ),
      w: perW * .5,
      c: data[i] > 0 ? '#f00' : 'rgb(2, 162, 99)'
    }))
  }
  /* 纵坐标刻度 */
  let v_l = 4
  for(let i = 1; i < v_l; i++) {
    let perY = maxY / v_l
    let _x = -10
    let _y = i * perY
    g.add(new Text({
      text: Math.round(i * perY).toString(),
      left: _x,
      top: Bar.coord([0, _y])[1],
      textAlign: 'right',
      c: '#ccc'
    }))    
  }  
  Painter.draw(_self, 'G', g)
})

