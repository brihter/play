const handler = (canvas, element) => {
  const onResize = () => {
    console.log('canvas.handler.resize:onResize')
    canvas.afterRender() // recalculate viewport size
    canvas.center()
  }

  window.addEventListener('resize', onResize)
  console.log('canvas.handler.resize:registered')
}

export default handler
