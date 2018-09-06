import Map from 'src/Map'
import G from 'models/G'
import Scene from 'models/temp'
import shuffle from 'src/util/shuffle'

let m = new Map('app')

function start() {
  console.log('重新开始')
 
  let s = new Scene({
    w: 19,
    h: 19,
    size: m.h
  })
  // 随机生命体单元
  // const _dirs = [[1, 0], [0, 1], [-1, 0], [0, -1], [1, -1], [1, 1], [-1, 1], [-1, -1]]
  const cr_number = 6
  s.lives = [
    [9, 8],
    [10, 8],
    [9, 9],
    [8, 9],
    [9, 10]
  ]
  s.w += 50
  s.h += 50
  while(s.lives.length < cr_number) {
    let x = Math.round(Math.random() * 2 - 1) + 9
    let y = Math.round(Math.random() * 2 - 1) + 9
    if(s.data[s.coord([x, y])]) continue
    s.lives = [...s.lives].concat([[x, y]])
  }

  m.add(s)
  let times = 0
  let max = 0
  let t = setInterval(function() {
    if(times > 4000) return clearInterval(t)
    else if(s.lives.length === 0) {
      clearInterval(t)
      start()
    }
    times++
    s.step()
    s.lives.length > max && (max = s.lives.length)
    // console.log(times ++, max, s.lives.length)  
    m.render()
  }, 1000 / 24)
  m.render()
}

start()