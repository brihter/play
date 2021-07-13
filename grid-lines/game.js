const game = () => {
  const STEP = 12
  const WIDTH = 2

  const makeGrid = (layer) => {
    for (let i = 0; i < window.innerWidth; i = i + STEP) {
      shape.line(layer, { x0: i, y0: 0, x1: i, y1: window.innerHeight, strokeStyle: '#1C1C1C', lineWidth: WIDTH }) // vertical
      shape.line(layer, { x0: 0, y0: i, x1: window.innerWidth, y1: i, strokeStyle: '#1C1C1C', lineWidth: WIDTH }) // horizontal
    }

    return layer
  }

  const makeLine = () => {
    const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

    const getX = () => {
      const tmp = rnd(0, window.innerWidth)
      return tmp - (tmp%STEP)
    }

    const getY = () => {
      const tmp = rnd(0, window.innerHeight)
      return tmp - (tmp%STEP)
    }

    const seed = () => [
      getX(),
      getY()
    ]

    const next = (xy) => {
      let x = xy[0]
      let y = xy[1]

      const direction = rnd(0,3)
      
      if (direction === 0) {
        x = xy[0]+STEP
      }

      if (direction === 1) {
        x = xy[0]-STEP
      }

      if (direction === 2) {
        y = xy[1]+STEP
      }

      if (direction === 3) {
        y = xy[1]-STEP
      }
      
      return [x,y]
    }

    const path = []

    let length = rnd(15,35)
    let current = seed()
    path.push(current)
    while (length > 0) {
      current = next(current)
      path.push(current)
      length--
    }

    return { index: 0, path }
  }

  let lineCount = 0
  lines = new Map()

  const generate = () => {
    lineCount++
    while (lines.size < 1) {
      lines.set(lineCount, makeLine())
    }
  }

  const paint = () => {
    lines.forEach((line) => {
      const { index, prevIndex, path } = line

      if (index === 0) {
        line.prevIndex = index
        line.index = line.index + 1
        return
      }

      shape.line(animation, {
        x0: path[prevIndex][0],
        y0: path[prevIndex][1],
        x1: path[index][0],
        y1: path[index][1],
        strokeStyle: '#E6FADC',
        lineWidth: 2,
        shadowBlur: 4,
        shadowColor: '#E6FADC',
        globalAlpha: 0.2
      })

      line.prevIndex = index
      line.index = line.index + 1
    })
  }

  const destroy = () => {
    lines.forEach((line, key) => {
      if (line.index < line.path.length) {
        return
      }

      lines.delete(key)
    })
  }

  let lastFrameTime = 0
  const loop = (elapsedTime) => {
    const delta = elapsedTime - (lastFrameTime || 0)
    window.requestAnimationFrame(loop)
    if (lastFrameTime && delta < 33) {
      return
    }

    generate()
    paint()
    destroy()

    lastFrameTime = elapsedTime
  }

  let background = layer({ name: 'background' })
  let grid = layer({ name: 'grid' })
  let animation = layer({ name: 'animation' })

  background = fx.fill(background, { color: '#222' })
  grid = makeGrid(grid)

  window.requestAnimationFrame(loop)
}
