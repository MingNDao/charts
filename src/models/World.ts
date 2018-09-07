import vNode from 'src/VNode'
import Painter from 'src/Painter'
import G from 'models/G'
import Line from 'src/models/Line';

const TAG = "WORLD"
interface world {
  h?: number,
  w?: number,
  size?: number
  data?: Int8Array
}
export default class World extends vNode{
  private _w: number = 20
  private _h: number = 20
  private size: number = 20
  data: Int8Array
  h: number = 1000
  w: number = 1000
  fr: G
  wall: Array<[number, number]> = []
  constructor(obj: world) {
    super(TAG)
    this.fr = new G({
      w: this.w,
      h: this.h
    })
    for(let x in obj) {
      this[x] = obj[x]
    }
    this.data = new Int8Array(this.rowNumber * this.colNumber)
  }
  addNode(x, y, dpr = 1) {
    let _x = Math.floor(x * dpr / this.size)
    let _y = Math.floor(y * dpr / this.size)
    if(!this.data[this.coord([_x, _y])]) {
      this.data[this.coord([_x, _y])] = 1
      this.wall.push([_x, _y])
    }
    this.wall.sort((a, b) => {
      if(a[1] === b[1]) return a[0] - b[0]
      return a[1] - b[1]
    })
  }
  coord(p: [number, number]):number {
    return (p[1] - 1) * this.colNumber + p[0]
  }
  decoord(number: number): [number, number] {
    const y = Math.floor(number / this.colNumber) + 1
    const x = number % this.colNumber
    return [x, y]
  }
  get rowNumber() {
    return Math.ceil(this.h / this.size)
  }
  get colNumber() {
    return Math.ceil(this.w / this.size)
  }
}

Painter.reg(TAG, function(Scene) {
  const { h, w, data, rowNumber, colNumber, size, fr, wall} = Scene
  const _self = this
  const g_0 = new G({})
  /* 绘制行列线 */
  for(let i = 1; i < colNumber; i++) {
    g_0.add(new Line({
      p1: [size * i, 0],
      p2: [size * i, h],
      c: 'rgba(255, 255, 255, .5)',
      w: .5
    }))
  }
  for(let i = 1; i < rowNumber; i++) {
    g_0.add(new Line({
      p1: [0, size * i],
      p2: [w, size * i],
      c: 'rgba(255, 255, 255, .5)',
      w: .5
    }))
  }
  /* 绘制墙体 */
  for(let p of wall) {
    g_0.add(new G({
      left: p[0] * size,
      top: p[1] * size,
      w: size,
      h: size,
      fill: true,
      c: 'rgba(255, 33, 33, 1)'
    }))
  }
  Painter.draw(_self, 'G', g_0)
  Painter.draw(_self, 'G', Scene.fr) 
})