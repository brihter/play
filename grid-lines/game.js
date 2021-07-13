const game = () => {
  const STEP = 8
  const WIDTH = 1
  const WINDOW_WIDTH = window.innerWidth
  const WINDOW_HEIGHT = window.innerHeight

  const makeLine = () => {
    const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

    const getX = () => {
      const tmp = rnd(0, WINDOW_WIDTH)
      return tmp - (tmp%STEP)
    }

    const getY = () => {
      const tmp = rnd(0, WINDOW_HEIGHT)
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
    while (lines.size < 10) {
      lines.set(lineCount, makeLine())
      lineCount++
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
        strokeStyle: '#000',
        lineWidth: WIDTH,
        globalAlpha: 0.25
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

  const fps = 30
  const fpsDelta = parseInt(1000 / fps)

  let lastFrameTime = 0
  const loop = (elapsedTime = 0) => {
    const delta = elapsedTime - lastFrameTime
    window.requestAnimationFrame(loop)
    if (lastFrameTime && delta < fpsDelta) {
      return
    }

    generate()
    paint()
    destroy()

    lastFrameTime = elapsedTime
  }

  let animation = layer({ name: 'animation' })
  window.requestAnimationFrame(loop)
}
