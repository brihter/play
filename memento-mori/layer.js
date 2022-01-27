const layer = () => {
  const create = (name, cfg = {}) => {
    let target = cfg.target || document.body

    const element = document.createElement('canvas')

    const dpr = window.devicePixelRatio || 1
    const box = target.getBoundingClientRect()

    element.width = box.width * dpr
    element.height = box.height * dpr
    element.style.width = '100%'
    element.style.height = '100%'

    let ctx = element.getContext('2d')
    ctx = Object.assign(ctx, cfg)
    ctx.scale(dpr, dpr)

    target.appendChild(element)

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
