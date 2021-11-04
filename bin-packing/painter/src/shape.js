const Shape = {}

Shape.line = (layer, cfg) => {
  let { ctx } = layer
  ctx = Object.assign(ctx, cfg)

  const {
    x0,
    y0,
    x1,
    y1
  } = cfg

  ctx.beginPath()
  ctx.moveTo(x0 + 0.5, y0 + 0.5) // http://diveintohtml5.info/canvas.html
  ctx.lineTo(x1 + 0.5, y1 + 0.5) // http://diveintohtml5.info/canvas.html
  ctx.stroke()

  return layer
}

Shape.path = (layer, cfg) => {
  const { path = [] } = cfg

  path.forEach(([x, y], index) => {
    if (index === 0) {
      return
    }

    shape.line(
      layer,
      Object.assign({
        x0: path[index - 1][0],
        y0: path[index - 1][1],
        x1: x,
        y1: y
      }, cfg)
    )
  })

  return layer
}

Shape.rectangle = (layer, cfg) => {
  let { ctx } = layer
  ctx = Object.assign(ctx, cfg)

  const { x, y, width, height } = cfg
  ctx.fillRect(x, y, width, height)

  return layer
}

export {
  Shape
}
