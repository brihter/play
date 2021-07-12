const shape = {}

shape.line = (layer, cfg) => {
  const { ctx } = layer
  const { x0, y0, x1, y1, color, width } = cfg
  
  ctx.beginPath()
  ctx.moveTo(x0, y0)
  ctx.lineTo(x1, y1)
  ctx.lineWidth = width
  ctx.strokeStyle = color
  ctx.stroke()

  return layer
}

shape.rectangle = (layer, cfg) => {
  const { ctx } = layer
  const { x, y, width, height, color } = cfg
  
  ctx.fillStyle = color
  ctx.fillRect(x, y, width, height)

  return layer
}