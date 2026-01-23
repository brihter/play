const fx = {}

fx.fill = (layer, { color }) => {
  const { element, ctx } = layer
  const dpr = window.devicePixelRatio || 1
  const w = element.width / dpr
  const h = element.height / dpr

  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = color
  ctx.fillRect(0, 0, w, h)

  return layer
}
