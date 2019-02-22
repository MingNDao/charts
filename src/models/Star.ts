import vNode from 'src/VNode'
import Painter from 'src/Painter'

/* 五角星 */
interface star {
  r : number // 内半径
  R : number // 外半径
  borderWidth?: number // 描边宽度
  borderStyle?: string // 描边颜色
  fill?: boolean //是否填充
  rot?: number //旋转角度
  center?: [number, number] //中心坐标
  fillStyle?: string //填充色
}
export default class Star extends vNode {
  r : number
  R : number
  center?: [number, number]
  fill?: boolean
  rot?: number
  borderWidth?: number
  borderStyle?: string
  fillStyle?: string
  constructor(obj : star) {
    super('STAR')
    for (let x in obj) {
      this[x] = obj[x]
    }
  }
  calCenter(): Array<number> {
    return [this.R * Math.cos(0.1 * Math.PI), this.R]
  }
}

Painter
  .reg('STAR', function (node : Star) {
    let { r, R, rot = 0, borderWidth = 1, fill, fillStyle = '#fff', borderStyle = '#fff', center = node.calCenter() } = node
    this.translate(...center)
    for (var i = 0; i < 5; i++) {
      let x1 = Math.cos((54 + 72 * i + rot) / 180 * Math.PI) * R
      let y1 = Math.sin((54 + 72 * i + rot) / 180 * Math.PI) * R
      let x2 = Math.cos((90 + 72 * i + rot) / 180 * Math.PI) * r
      let y2 = Math.sin((90 + 72 * i + rot) / 180 * Math.PI) * r
      this.lineTo(x1, y1);
      this.lineTo(x2, y2);
    }
    this.lineWidth = borderWidth;
    this.closePath();
    this.strokeStyle = borderStyle;
    this.stroke();
    if (fill) {
      this.fillStyle = fillStyle
      this.fill()
    }
  })
