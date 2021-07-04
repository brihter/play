const load = (image) => {
  const canvas = document.createElement('canvas')
  canvas.style = 'display:none'
  const ctx = canvas.getContext('2d')
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0, img.width, img.height)
      resolve(ctx)
    }
    img.src = image
  })
}

const render = (sourceCtx, target) => {
  const ctx = document.getElementById(target).getContext('2d')
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(sourceCtx.canvas, 0, 0)
}

const diff = (img1, img2) => {
  return pixelmatch(
    img1.data,
    img2.data,
    null,
    img1.width,
    img1.height,
    { threshold: 0.1 }
  )
}
