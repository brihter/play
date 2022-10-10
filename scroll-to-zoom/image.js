const image = {}

image.load = (ctx, path) => {
  const image = new Image()
  image.onload = () => {
    const offsetX = (ctx.canvas.width / 2) - (image.width / 2)
    const offsetY = (ctx.canvas.height / 2) - (image.height / 2)
    ctx.drawImage(image, offsetX, offsetY)
  }
  image.src = path
}
