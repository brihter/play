const register = (canvas, element) => {
  canvas._translate = {
    x: 0,
    y: 0
  }

  const name = 'translate'

  const fn = (x, y) => {
    // console.log(canvas._translate.x, canvas._translate.y, 'old')
    // console.log(x, y, 'new')
    canvas._translate.x = x
    canvas._translate.y = y
    element.style.translate = `${x}px ${y}px`
    console.log('canvas:translate', { x, y })
  }

  return { name, fn }
}

export default register
