const layer = () => {
  const create = (name, cfg = {}) => {
    let target = cfg.target || document.body

    const element = document.createElement('canvas')
    const box = target.getBoundingClientRect()

    // element.width = window.innerWidth
    // element.height = window.innerHeight
    // element.style.position = 'absolute'
    // element.style.top = 0
    // element.style.left = 0

    element.width = box.width
    element.height = box.height
    element.style.width = '100%'
    element.style.height = '100%'

    let ctx = element.getContext('2d')
    ctx = Object.assign(ctx, cfg)

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
