// TODO scale to cursor
const handler = (canvas, element) => {
  const getScale = (e) => {
    const getDelta = (e) => Math.sign(e.deltaY) * -1

    const getFactor = () => {
      let factor = 4
      if (canvas._scale.scale >= 2 && canvas._scale.scale < 4) factor = 2
      if (canvas._scale.scale >= 4 && canvas._scale.scale < 8) factor = 1
      if (canvas._scale.scale > 8 && canvas._scale.scale < 16) factor = 0.5
      if (canvas._scale.scale > 16) factor = 0.25
      return factor
    }

    const delta = getDelta(e)
    const factor = getFactor()

    let scale = parseFloat((canvas._scale.scale + delta / factor).toFixed(2))
    if (scale > canvas._scale.max) scale = canvas._scale.max
    if (scale < canvas._scale.min) scale = canvas._scale.min
    return scale
  }

  const onWheel = (e) => {
    console.log('canvas.handler.scale:onWheel')
    const scale = getScale(e)
    canvas.scale(scale)
  }

  window.addEventListener('wheel', onWheel)
  console.log('canvas.handler.scale:registered')
}

export default handler
