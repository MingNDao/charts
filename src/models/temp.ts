import vNode from 'src/VNode'
import Painter from 'src/Painter'
import G from 'models/G'

const TAG = "TEMP"
interface scene {
  h?: number,
  w?: number,
  size?: number
  data?: Int8Array
}
export default class Scene extends vNode{
  private _w: number = 20
  private _h: number = 20
  private _lives: Array<[number, number]> = []
  data: Int8Array
  size: number = 1000
  fr: G
  children: Array<G> = []
  
  constructor(obj: scene) {
    super(TAG)
    this.fr = new G({
      w: this.size,
      h: this.size
    })    
    for(let x in obj) {
      this[x] = obj[x]
    }
    this.rebuild()
  }
  step() {
    let _delArr = [] // 待删除
    let _addArr = [] // 待添加
    const _dirs = [[1, 0], [0, 1], [-1, 0], [0, -1], [1, -1], [1, 1], [-1, 1], [-1, -1]]
    // 计算待删除的内容
    for(let cr of this.lives) {
      let _l = 0
      for(let dir of _dirs) {
        let _x = cr[0] + dir[0]
        let _y = cr[1] + dir[1]
        if(this.data[this.coord([_x, _y])]) _l ++
      }
      if(_l > 3 || _l < 2) _delArr.push(cr)
    }
    // 计算待添加的内容
    for(let cr of this.space_area) {
      let _l = 0
      for(let dir of _dirs) {
        let _x = cr[0] + dir[0]
        let _y = cr[1] + dir[1]
        if(this.data[this.coord([_x, _y])]) _l ++
      }
      if(_l === 3) _addArr.push(cr)
    }
    // 开始删除内容
    for(let cr of _delArr) {
      let _i = this.lives.indexOf(cr)
      this.lives.splice(_i, 1)
    }
    // 开始添加内容
    this.lives.push(..._addArr)
    this.lives = this.lives
    // 计算边界
    const _minX = Math.min(...this.space_area.map(item => item[0]))
    const _maxX = Math.max(...this.space_area.map(item => item[0]))
    const _minY = Math.min(...this.space_area.map(item => item[1]))
    const _maxY = Math.min(...this.space_area.map(item => item[1]))
    if(_minX <= 2 || _maxX >= this.w - 2 || _minY <= 2 || _maxY >= this.w - 2) {
      this.w += 10
      this.h += 10
    }
  }
  get w():number {
    return this._w
  }
  set w(val: number) {
    let dW = val - this._w
    this._w = val
    this.lives = this.lives.map(item => {
      return [item[0] + dW / 2, item[1]]
    }) as Array<[number, number]>
    this.rebuild()
  }
  get h():number {
    return this._h
  }
  set h(val) {
    let dH = val - this._h
    this._h = val
    this.lives = this.lives.map(item => {
      return [item[0], item[1]  + dH / 2]
    }) as Array<[number, number]>
    this.rebuild()
  }
  rebuild() {
    this.fr && this.fr.clear()
    this.data = new Int8Array(this.h * this.w)
    this.children = []
    for(let i = 0; i < this.data.length; i++) {
      let _g = new G({
        w: this.perW - this.perW * .1,
        h: this.perH - this.perW * .1,
        left: this.perW * this.decoord(i)[0] + this.perW * .05,
        top: this.perH * (this.decoord(i)[1] - 1) + this.perW * .05,
        fill: true
      })
      this.children.push(_g)
      this.fr.add(_g)
    }
    this.lives = this.lives
  }
  coord(p: [number, number]):number {
    return (p[1] - 1) * this.w + p[0]
  }
  decoord(number: number): [number, number] {
    const y = Math.floor(number / this.w) + 1
    const x = number % this.w
    return [x, y]
  }
  get lives (): Array<[number, number]>  {
    return this._lives
  }
  set lives (arr) {
    // 快速去重 
    // let _tempArr = arr.map(item => this.coord(item))
    // _tempArr.sort()
    // this._lives = _tempArr.filter((item, index) => {
    //   if (index) {
    //     return item != _tempArr[index - 1]
    //   } else return true
    // }).map(item => {
    //   return this.decoord(item)
    // })
    this._lives = arr
    this.data && this.data.fill(0)
    for(let x of arr) {
      this.data[this.coord(x)] = 1
    }
  }
  get space_area(): Array<[number, number]> {
    const { data, lives } = this
    const space_area = []
    const dirs = [[1, 0], [0, 1], [-1, 0], [0, -1], [1, -1], [1, 1], [-1, 1], [-1, -1]]
    for(let cr of lives) {
      for(let dir of dirs) {
        let _x = cr[0] + dir[0]
        let _y = cr[1] + dir[1]
        if(data[this.coord([_x, _y])] === 0) space_area.push([_x, _y])
      }
    }
    space_area.sort((a, b) => {
      if(a[0] === b[0]) {
        return a[1] - b[1]
      } else return a[0] - b[0]
    })
    return space_area.filter((item, index) => {
      if (index) {
        const prev = space_area[index - 1]
        return item[0] !== prev[0] || item[1] !== prev[1]
      } else return true
    })
  }
  get perW() {
    return this.size / this.w
  }
  get perH() {
    return this.size / this.h
  }
}

Painter.reg(TAG, function(Scene) {
  const { h, w, data, perW, perH, fr, lives, space_area, children } = Scene
  const _self = this

  for(let x = 0; x < data.length; x++) {
    children[x].c = 'rgba(0, 0, 0, .1)'
  }
  for(let s of lives) {
    children[Scene.coord(s)].c = '#ff0'
  }
  for(let s of space_area) {
    children[Scene.coord(s)].c = 'rgba(255, 255, 0, .3)'
  }
  Painter.draw(_self, 'G', Scene.fr) 
})