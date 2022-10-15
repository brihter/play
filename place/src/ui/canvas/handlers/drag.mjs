const handler = (canvas, element) => {
  canvas._drag = {
    active: false
  }

  const handleDrag = ({ enable }) => {
    canvas._drag.active = enable
    if (enable) {
      window.addEventListener('mousemove', onMouseMove)
    } else {
      window.removeEventListener('mousemove', onMouseMove)
    }
  }

  const onMouseDown = () =>
    handleDrag({
      enable: true
    })

  const onMouseUp = () =>
    handleDrag({
      enable: false
    })

  const onMouseMove = (e) => {
    e.preventDefault()
    if (!canvas._drag.active) {
      return
    }

    console.log('canvas.handler.drag:onDrag')
    const dx = canvas._translate.x + e.movementX
    const dy = canvas._translate.y + e.movementY
    canvas.translate(dx, dy)
  }

  element.addEventListener('mousedown', onMouseDown)
  window.addEventListener('mouseup', onMouseUp)
  console.log('canvas.handler.drag:registered')
}

export default handler
