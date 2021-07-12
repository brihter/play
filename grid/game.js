const game = () => {
  const STEP = 12
  const WIDTH = 2

  const makeGrid = (layer) => {
    for (let i = 0; i < window.innerWidth; i = i + STEP) {
      shape.line(layer, { x0: i, y0: 0, x1: i, y1: window.innerHeight, color: '#1E2226', width: WIDTH }) // vertical
      shape.line(layer, { x0: 0, y0: i, x1: window.innerWidth, y1: i, color: '#1E2226', width: WIDTH }) // horizontal
    }

    return layer
  }

  const makeSnake = (layer) => {
    const rnd = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const getX = () => {
      const padding = 0
      const tmp = rnd(padding, window.innerWidth-padding)
      return tmp - (tmp%STEP) + 1
    }

    const getY = () => {
      const padding = 0
      const tmp = rnd(padding, window.innerHeight-padding)
      return tmp - (tmp%STEP) + 1
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

    let length = 20
    let current = seed()
    path.push(current)
    while (length > 0) {
      current = next(current)
      path.push(current)
      length--
    }

    shape.path(layer, {
      path,
      color: '#fff',
      width: 1
    })

    return layer
  }

  let background = layer({ name: 'background' })
  background = fx.fill(background, { color: '#262B30' })
  
  let grid = layer({ name: 'grid' })
  grid = makeGrid(grid)

  let snakes = layer({ name: 'snakes' })
  snakes = makeSnake(snakes)
}
