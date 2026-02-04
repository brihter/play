const SIZE = 4
const W = Math.ceil(innerWidth / SIZE)
const H = Math.ceil(innerHeight / SIZE)
const PW = W + 2
const PH = H + 2

const ALIVE = 0xFFFFFFFF
const DEAD = 0xFF000000

const canvas = document.createElement('canvas')
canvas.width = W
canvas.height = H
canvas.style.cssText = `width:${W * SIZE}px;height:${H * SIZE}px`
document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')
const img = ctx.createImageData(W, H)
const pixels = new Uint32Array(img.data.buffer)

let grid = new Uint8Array(PW * PH)
let next = new Uint8Array(PW * PH)

for (let y = 1; y <= H; y++)
  for (let x = 1; x <= W; x++)
    grid[y * PW + x] = Math.random() < 0.3 ? 1 : 0

const step = () => {
  const g = grid
  const n = next
  const pw = PW
  const w = W
  const h = H

  for (let x = 1; x <= w; x++) {
    g[x] = g[h * pw + x]
    g[(h + 1) * pw + x] = g[pw + x]
  }

  for (let y = 0; y < PH; y++) {
    const row = y * pw
    g[row] = g[row + w]
    g[row + w + 1] = g[row + 1]
  }

  for (let y = 1; y <= h; y++) {
    const row = y * pw
    const above = row - pw
    const below = row + pw

    for (let x = 1; x <= w; x++) {
      const i = row + x
      const neighbors = g[above + x - 1] + g[above + x] + g[above + x + 1]
                      + g[row + x - 1]                   + g[row + x + 1]
                      + g[below + x - 1] + g[below + x] + g[below + x + 1]

      n[i] = (neighbors | g[i]) === 3 ? 1 : 0
    }
  }

  grid = n
  next = g
}

const draw = () => {
  const g = grid
  const px = pixels
  const pw = PW
  const w = W
  const h = H

  let p = 0
  for (let y = 1; y <= h; y++) {
    const row = y * pw
    for (let x = 1; x <= w; x++)
      px[p++] = g[row + x] ? ALIVE : DEAD
  }

  ctx.putImageData(img, 0, 0)
}

const loop = () => {
  step()
  draw()
  requestAnimationFrame(loop)
}

draw()
requestAnimationFrame(loop)
