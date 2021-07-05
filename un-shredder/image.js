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
      canvas.remove()
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
  const canvas = document.createElement('canvas')
  canvas.style = 'display:none'
  canvas.width = img1.width
  canvas.height = img1.height
  
  const ctx = canvas.getContext('2d')

  const crop = (img, direction) => {
    const edgeWidth = 1
    ctx.putImageData(img, 0, 0)

    if (direction === 'left') {
      return ctx.getImageData(0, 0, edgeWidth, img.height)
    }

    if (direction === 'right') {
      return ctx.getImageData(img.width-edgeWidth, 0, edgeWidth, img.height)
    }
  }

  const right = (img) => {
    return crop(img, 'right')
  }

  const left = (img) => {
    return crop(img, 'left')
  }

  const leftEdge = left(img2)
  const rightEdge = right(img1)

  const diff = pixelmatch(
    rightEdge.data,
    leftEdge.data,
    null,
    leftEdge.width,
    leftEdge.height,
    { threshold: 0.1 }
  )

  canvas.remove()

  return {
    diff,
    surface: leftEdge.width * leftEdge.height
  }
}
