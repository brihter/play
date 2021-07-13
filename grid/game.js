const game = () => {
  const STEP = 12
  const WIDTH = 2

  const makeGrid = (layer) => {
    for (let i = 0; i < window.innerWidth; i = i + STEP) {
      shape.line(layer, { x0: i, y0: 0, x1: i, y1: window.innerHeight, strokeStyle: '#1E2226', lineWidth: WIDTH }) // vertical
      shape.line(layer, { x0: 0, y0: i, x1: window.innerWidth, y1: i, strokeStyle: '#1E2226', lineWidth: WIDTH }) // horizontal
    }

    return layer
  }

  const makeSnake = (layer) => {
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

    shape.path(layer, {
      path,
      strokeStyle: '#fff',
      lineWidth: 2,
      shadowBlur: 4,
      shadowColor: '#fff',
      globalAlpha: 0.5
    })

    return layer
  }

  let background = layer({ name: 'background' })
  background = fx.fill(background, { color: '#262B30' })
  
  let grid = layer({ name: 'grid' })
  grid = makeGrid(grid)

  let snakes = layer({ name: 'snakes' })
  for (let i=0; i<25; ++i) {
    snakes = makeSnake(snakes)
  }
}
