const register = (canvas, element) => {
  const name = 'center'

  const fn = () => {
    const x = (canvas._render.vw - element.width) / 2
    const y = (canvas._render.vh - element.height) / 2

    canvas.translate(x, y)
    console.log('canvas:center', { x, y })
  }

  return { name, fn }
}

export default register
