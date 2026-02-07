const C = 6
const COLS = 10
const ROWS = 20
const TOP = 9
const LEFT = 2
const W = LEFT + COLS * C + 1
const H = TOP + ROWS * C + 1
const S = Math.min(innerHeight * .85 / H, innerWidth * .85 / W) | 0
const ON = 0xFFFFFFFF
const OFF = 0xFF000000
const FONT = [31599, 11415, 29671, 29647, 23497, 31183, 31215, 29257, 31727, 31695]

const canvas = document.createElement('canvas')
canvas.width = W
canvas.height = H
canvas.style.cssText = `width:${W*S}px;height:${H*S}px;position:fixed;top:${(innerHeight-H*S)/2|0}px;left:${(innerWidth-W*S)/2|0}px`
document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')
const img = ctx.createImageData(W, H)
const px = new Uint32Array(img.data.buffer)

const SHAPES = [
  [[-1,0],[0,0],[1,0],[2,0]],
  [[0,0],[1,0],[0,1],[1,1]],
  [[-1,0],[0,0],[1,0],[0,-1]],
  [[-1,0],[0,0],[0,-1],[1,-1]],
  [[-1,-1],[0,-1],[0,0],[1,0]],
  [[-1,-1],[-1,0],[0,0],[1,0]],
  [[-1,0],[0,0],[1,0],[1,-1]]
]

const rotate = s => s.map(([x, y]) => [-y, x])

const board = new Uint8Array(COLS * ROWS)
let score = 0
let cur = {}

const fits = (s, ox, oy) =>
  s.every(([dx, dy]) => {
    const x = ox + dx, y = oy + dy
    return x >= 0 && x < COLS && y < ROWS && (y < 0 || !board[y * COLS + x])
  })

const spawn = () => {
  cur = { s: SHAPES[Math.random() * 7 | 0], x: 4, y: 0 }
  if (!fits(cur.s, cur.x, cur.y)) {
    board.fill(0)
    score = 0
    spawn()
  }
}

const rowFull = y => {
  for (let i = y * COLS, end = i + COLS; i < end; i++)
    if (!board[i]) return false
  return true
}

const lock = () => {
  for (let i = 0; i < 4; i++) {
    const y = cur.y + cur.s[i][1]
    if (y >= 0) board[y * COLS + cur.x + cur.s[i][0]] = 1
  }
  let n = 0
  for (let y = ROWS - 1; y >= 0;) {
    if (rowFull(y)) {
      board.copyWithin(COLS, 0, y * COLS)
      board.fill(0, 0, COLS)
      n++
    } else y--
  }
  if (n) score += [0, 100, 300, 500, 800][n]
  spawn()
}

const tryMove = (dx, dy, s = cur.s) =>
  fits(s, cur.x + dx, cur.y + dy)
    ? (cur = { s, x: cur.x + dx, y: cur.y + dy }, true)
    : false

const cell = (cx, cy) => {
  const x0 = cx * C + LEFT, y0 = cy * C + TOP
  for (let y = y0; y < y0 + C - 1; y++)
    for (let x = x0; x < x0 + C - 1; x++)
      px[y * W + x] = ON
}

const digit = (n, ox, oy) => {
  for (let b = FONT[n], r = 0; r < 5; r++)
    for (let c = 0; c < 3; c++)
      if (b >> (14 - r * 3 - c) & 1)
        px[(oy + r) * W + ox + c] = ON
}

const draw = () => {
  px.fill(OFF)
  for (let x = 0; x < W; x++) px[(TOP - 2) * W + x] = px[(H - 1) * W + x] = ON
  for (let y = TOP - 2; y < H; y++) px[y * W] = px[y * W + W - 1] = ON
  const s = String(score)
  const sx = (W - s.length * 4 + 1) >> 1
  for (let i = 0; i < s.length; i++) digit(+s[i], sx + i * 4, 1)
  for (let y = 0; y < ROWS; y++)
    for (let x = 0; x < COLS; x++)
      if (board[y * COLS + x]) cell(x, y)
  for (let i = 0; i < 4; i++) {
    const y = cur.y + cur.s[i][1]
    if (y >= 0) cell(cur.x + cur.s[i][0], y)
  }
  ctx.putImageData(img, 0, 0)
}

const actions = {
  ArrowLeft: () => tryMove(-1, 0),
  ArrowRight: () => tryMove(1, 0),
  ArrowDown: () => { if (!tryMove(0, 1)) lock() },
  ArrowUp: () => tryMove(0, 0, rotate(cur.s)),
  ' ': () => { while (tryMove(0, 1)); lock() }
}

document.onkeydown = e => {
  if (actions[e.key]) {
    actions[e.key]()
    e.preventDefault()
    draw()
  }
}

spawn()

let last = 0
const loop = t => {
  if (t - last > 500) {
    if (!tryMove(0, 1)) lock()
    last = t
  }
  draw()
  requestAnimationFrame(loop)
}

requestAnimationFrame(loop)
