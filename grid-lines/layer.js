const layer = ({ name }) => {
  const element = document.createElement('canvas')

  const dpr = window.devicePixelRatio || 1
  const w = window.innerWidth
  const h = window.innerHeight

  // backing store in device pixels
  element.width = Math.floor(w * dpr)
  element.height = Math.floor(h * dpr)

  // css size in css pixels
  element.style.width = w + 'px'
  element.style.height = h + 'px'

  element.style.position = 'absolute'
  element.style.top = 0
  element.style.left = 0

  document.body.appendChild(element)

  const ctx = element.getContext('2d')
  // map drawing units to css pixels
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  return {
    name,
    element,
    ctx
  }
}
