const load = (image) => {
  const canvas = document.getElementById('shredded')
  const ctx = canvas.getContext('2d')
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      ctx.drawImage(img, 0, 0, img.width, img.height)
      resolve(ctx)
    }
    img.src = image
  })
}
