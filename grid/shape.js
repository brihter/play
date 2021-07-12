const shape = {}

shape.line = (layer, cfg) => {
  const { ctx } = layer
  const { x0, y0, x1, y1, color, width } = cfg
  
  ctx.beginPath()
  ctx.moveTo(x0+0.5, y0+0.5) // http://diveintohtml5.info/canvas.html
  ctx.lineTo(x1+0.5, y1+0.5) // http://diveintohtml5.info/canvas.html
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

shape.path = (layer, cfg) => {
  const { path = [], color, width } = cfg

  path.forEach(([x,y], index) => {
    if (index === 0) {
      return
    }

    const x0 = path[index-1][0]
    const y0 = path[index-1][1]

    const x1 = x
    const y1 = y

    shape.line(layer, {
      x0,
      y0,
      x1,
      y1,
      width,
      color
    })
  })

  return layer
}
