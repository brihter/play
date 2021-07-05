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

const diffOne = (img1, img2, ctx) => {
  const crop = (img, direction) => {
    const edgeWidth = 1
    ctx.putImageData(img, 0, 0)

    if (direction === 'left') {
      return ctx.getImageData(0, 0, edgeWidth, img.height)
    }

    if (direction === 'right') {
      return ctx.getImageData(img.width - edgeWidth, 0, edgeWidth, img.height)
    }
  }

  const leftEdge = crop(img2, 'left')
  const rightEdge = crop(img1, 'right')

  return pixelmatch(
    rightEdge.data,
    leftEdge.data,
    null,
    leftEdge.width,
    leftEdge.height,
    { threshold: 0.1 }
  )
}

const diff = (pairs) => {
  const canvas = document.createElement('canvas')
  canvas.style = 'display:none'

  const img = pairs[0].strip1
  canvas.width = img.width
  canvas.height = img.height

  const ctx = canvas.getContext('2d')

  pairs = pairs.map((pair) => {
    return {
      index1: pair.index1,
      index2: pair.index2,
      diff: diffOne(pair.strip1, pair.strip2, ctx)
    }
  })

  canvas.remove()

  return pairs
}
