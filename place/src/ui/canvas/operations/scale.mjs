const register = (canvas, element) => {
  canvas._scale = {
    scale: 1,
    min: 0.2,
    max: 20
  }

  const name = 'scale'

  const fn = (scale) => {
    canvas._scale.scale = scale
    element.style.transform = `scale(${scale})`
    console.log('canvas:scale', { scale })
  }

  return { name, fn }
}

export default register
