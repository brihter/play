const canvas = {}

canvas._zoom = 2
canvas.get_zoom = (event) => {
  const delta = Math.sign(event.deltaY) * -1
  const newZoom = canvas._zoom + (delta / 2)
  if (newZoom > 5) return canvas._zoom
  if (newZoom < 1) return canvas._zoom
  canvas._zoom = newZoom
  return canvas._zoom
}
