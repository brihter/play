const shape = {}

shape.line = (layer, cfg) => {
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

shape.path = (layer, cfg) => {
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

shape.rectangle = (layer, cfg) => {
  let { ctx } = layer
  ctx = Object.assign(ctx, cfg)

  const { x, y, width, height } = cfg
  ctx.fillRect(x, y, width, height)

  return layer
}

shape.circle = (layer, cfg) => {
  let { ctx } = layer
  ctx = Object.assign(ctx, cfg)

  ctx.beginPath()
  ctx.arc(
    cfg.x,
    cfg.y,
    cfg.radius,
    cfg.startAngle || 0,
    cfg.endAngle || 2 * Math.PI,
    cfg.counterclockwise || false
  )

  if (cfg.mode === 'stroke') {
    ctx.stroke()
  } else {
    ctx.fill()
  }

  return layer
}

shape.pie = (layer, cfg) => {
  let { ctx } = layer
  ctx = Object.assign(ctx, cfg)

  ctx.beginPath();
  ctx.moveTo(cfg.x, cfg.y)
  ctx.arc(
    cfg.x,
    cfg.y,
    cfg.radius,
    cfg.startAngle || 0,
    cfg.endAngle || 2 * Math.PI,
    cfg.counterclockwise || false
  )
  ctx.lineTo(cfg.x, cfg.y)

  if (cfg.mode === 'stroke') {
    ctx.stroke()
  } else {
    ctx.fill()
  }

  return layer
}
