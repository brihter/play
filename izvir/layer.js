const layer = (name, cfg) => {
  const toMatrix = ({ layer, size }) => {
    const pixels = layer.ctx.getImageData(0, 0, layer.width, layer.height).data

    const matrix = []
    for (let i = 0; i < layer.height; i += size) {
      for (let j = 0; j < layer.width; j += size) {
        const alpha = pixels[(j + i * layer.width) * 4 + 3]

        if (alpha === 0) {
          continue
        }

        matrix.push([
          Math.floor(j),
          Math.floor(i)
        ])
      }
    }

    return matrix
  }

  const element = document.createElement('canvas')
  
  element.width = window.innerWidth
  element.height = window.innerHeight
  element.style.width = '100%'
  element.style.height = '100%'
  element.style.position = 'absolute'
  element.style.top = 0
  element.style.left = 0

  let ctx = element.getContext('2d')
  ctx = Object.assign(ctx, cfg)

  document.body.appendChild(element)
  
  return {
    name,
    element,
    ctx,
    width: element.width,
    height: element.height,
    toMatrix
  }
}
