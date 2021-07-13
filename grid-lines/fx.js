const fx = {}

fx.fill = (layer, { color }) => {
  const { element, ctx } = layer

  ctx.clearRect(0, 0, element.width, element.height)
  ctx.fillStyle = color
  ctx.fillRect(0, 0, element.width, element.height)

  return layer
}
