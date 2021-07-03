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

const render = (buffer, target) => {
  const canvas = document.getElementById(target)
  const ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height

  ctx.clearRect(0, 0, width, height)
  buffer.forEach(({ data, width }, i) => {
    ctx.putImageData(data, i * width, 0)
  })
}
