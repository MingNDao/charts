import vNode from 'src/VNode'
import Painter from 'src/Painter'
import Line from 'models/Line'
import Lines from 'models/Lines'
import G from 'models/G';
import Text from 'models/Text'
import Bar from 'models/Bar'
import RC from 'models/RectCoordinate'

let tag = 'SHARETIME_CHART'

interface rect {
  w?: number
  h?: number
  left?: number
  top?: number
  minX?: number
  minY?: number
  maxX?: number
  maxY?: number
  padding?: string|number
  data: Array<number>
}

export default class Temp extends vNode {
  w: number = 100
  h: number = 100
  left: number = 0
  top: number = 0
  minX: number = 0
  maxX: number = 241
  minY: number = 0
  maxY: number = 100
  padding: string|number = 100
  children: Array<any>
  data: Array<any>
  c: string
  readonly length: number = 241
  constructor(obj: rect) {
    super(tag)
    for(let x in obj) {
      this[x] = obj[x]
    }
    this.c = `rgba(${Math.round(Math.random() * 0xff)}, ${Math.round(Math.random() * 0xff)}, ${Math.round(Math.random() * 0xff)}, .3)`
    this.update(this.data)
  }
  // 数据更新
  update(data) {
    this.data = data
  }
  /**
   * 计算边界值
   * @param padding { Number|String }
   * @return { Array[number, number, number, number] } - 上、右、下、左
   */
  static calcPadding(padding: number|string) : [number, number, number, number]{
    let _type = typeof padding
    if(_type === 'number') {
      let _t = padding as number
      return [_t, _t, _t, _t]
    } else {
      let _t = padding as string
      _t = _t.replace(/^\s|\s$/g, '')
      const arr = _t.split(/\s/).map(item => Number(item))
      switch (arr.length) {
        case 1: return [arr[0], arr[0], arr[0], arr[0]]
        case 2: return [arr[0], arr[1], arr[0], arr[1]]
        case 3: return [arr[0], arr[1], arr[2], arr[0]]
        case 4: return arr as [number, number, number, number]
        default: return [100, 100, 100, 100]
      }
    }
  }
}

Painter.reg(tag, function(node: Temp) {
  const { padding, w, h, c, data } = node
  const _self = this
  const trading_price = data.map(item => item[0])
  const trading_volume = data.map(item => item[1])
  let _p = Temp.calcPadding(padding) as [number, number, number, number]
  const _pW = w - _p[1] - _p[3]
  const _pH = h - _p[0] - _p[2]
  const g_1 = new G({
    w,
    h
  })
  let g_h = new G()
  let strs = ['9:30', '10:00', '10:30', '11:00', '11:30/13:00', '13:30', '14:00', "14:30", "15:00"]
  for(let i = 0; i < strs.length; i ++) {
    let _x = _pW / (strs.length - 1) * i + _p[3]
    let _y = _pH + 12 + _p[0]
    g_h.add(new Text({
      text: strs[i],
      left: _x,
      top: _y,
      textAlign: 'center',
      c: '#ccc'
    }))
  }
  g_1.add(g_h)  
  /* 坐标线 */
  // const l_1 = new Lines({
  //   pointers: [
  //     [_p[3], _p[0]],
  //     [_p[3], h - _p[2]],
  //     [w - _p[1], h - _p[2]]
  //   ],
  //   c: 'rgba(233, 233, 233, .3)',
  //   w: 1
  // })
  // const l_3 = new Line({
  //   p1: [_p[3], _p[0] + _pH * .7],
  //   p2: [w - _p[1], _p[0] + _pH * .7],
  //   c: 'rgba(233, 233, 233, .3)',
  //   w: 1
  // })
  // g_1.add( l_3)
  /* 折线图 */
  const rc_1 = new RC({
    data: trading_price,
    left: _p[3],
    top: _p[0],    
    w: _pW,
    h: _pH * .7,
    showCoord: [true, false]
  })
  g_1.add(rc_1)
  /* 交易量 */
  const b_1 = new Bar({
    data: trading_volume,
    left: _p[3],
    top: _p[0] + _pH * .7,
    w: _pW,
    h: _pH * .3
  })
  g_1.add(b_1)
  /* 渲染 */
  Painter.draw(_self, 'G', g_1)
})