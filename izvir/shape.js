const shape = {}

shape.line = (layer, cfg) => {
  const { ctx } = layer
  const { x0, y0, x1, y1, strokeStyle, lineWidth } = cfg

  if (strokeStyle) ctx.strokeStyle = strokeStyle
  if (lineWidth) ctx.lineWidth = lineWidth

  ctx.beginPath()
  ctx.moveTo(x0 + 0.5, y0 + 0.5)
  ctx.lineTo(x1 + 0.5, y1 + 0.5)
  ctx.stroke()

  return layer
}

shape.path = (layer, cfg) => {
  const { path = [], strokeStyle, lineWidth } = cfg

  for (let i = 1; i < path.length; i++) {
    shape.line(layer, {
      x0: path[i - 1][0],
      y0: path[i - 1][1],
      x1: path[i][0],
      y1: path[i][1],
      strokeStyle,
      lineWidth
    })
  }

  return layer
}

shape.rectangle = (layer, cfg) => {
  const { ctx } = layer
  const { x, y, width, height, fillStyle } = cfg

  if (fillStyle) ctx.fillStyle = fillStyle
  ctx.fillRect(x, y, width, height)

  return layer
}

shape.circle = (layer, cfg) => {
  const { ctx } = layer
  const { x, y, radius, startAngle, endAngle, counterclockwise, mode, strokeStyle, fillStyle, lineWidth } = cfg

  if (strokeStyle) ctx.strokeStyle = strokeStyle
  if (fillStyle) ctx.fillStyle = fillStyle
  if (lineWidth) ctx.lineWidth = lineWidth

  ctx.beginPath()
  ctx.arc(x, y, radius, startAngle || 0, endAngle || 2 * Math.PI, counterclockwise || false)

  if (mode === 'stroke') {
    ctx.stroke()
  } else {
    ctx.fill()
  }

  return layer
}

shape.pie = (layer, cfg) => {
  const { ctx } = layer
  const { x, y, radius, startAngle, endAngle, counterclockwise, mode, strokeStyle, fillStyle, lineWidth } = cfg

  if (strokeStyle) ctx.strokeStyle = strokeStyle
  if (fillStyle) ctx.fillStyle = fillStyle
  if (lineWidth) ctx.lineWidth = lineWidth

  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.arc(x, y, radius, startAngle || 0, endAngle || 2 * Math.PI, counterclockwise || false)
  ctx.lineTo(x, y)

  if (mode === 'stroke') {
    ctx.stroke()
  } else {
    ctx.fill()
  }

  return layer
}
