const Layer = () => {
  const create = (name, cfg) => {
    const element = document.createElement('canvas')

    const dpr = window.devicePixelRatio || 1
    element.width = window.innerWidth * dpr
    element.height = window.innerHeight * dpr

    element.style.width = '100%'
    element.style.height = '100%'
    element.style.position = 'absolute'
    element.style.top = 0
    element.style.left = 0

    let ctx = element.getContext('2d')
    ctx.scale(dpr, dpr)
    ctx = Object.assign(ctx, cfg)

    document.body.appendChild(element)

    return {
      name,
      element,
      ctx,
      width: element.width,
      height: element.height,
    }
  }

  return {
    create
  }
}

export {
  Layer
}
