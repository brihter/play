const register = (canvas, canvasElement) => {
  const snap = () => {
    let { x, y } = canvas._translate
    const { centerX, centerY } = canvas._render
    const { top, bottom, left, right } = canvasElement.getBoundingClientRect()

    if (right < centerX) x = x + (centerX - right)
    if (left > centerX) x = x - (left - centerX)
    if (bottom < centerY) y = y + (centerY - bottom)
    if (top > centerY) y = y - (top - centerY)

    translateFn(x, y)
  }

  const translateFn = canvas.translate
  canvas.translate = (x, y) => {
    translateFn(x, y)
    snap()
  }

  const scaleFn = canvas.scale
  canvas.scale = (scale) => {
    scaleFn(scale)
    snap()
  }
}

export default register
