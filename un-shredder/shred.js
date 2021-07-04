const shred = (ctx, opts) => {
  opts = Object.assign({
    width: 4
  }, opts)

  const width = ctx.canvas.width
  const height = ctx.canvas.height

  const cut = (ctx) => {
    const steps = width / opts.width

    return Array.from(Array(steps).keys())
      .map((el, i) => {
        const offset = i * opts.width
        return ctx.getImageData(offset, 0, opts.width, height)
      })
  }

  const shuffle = (strips) => {
    return strips.sort(() => 0.5 - Math.random())
  }

  const draw = (strips) => {
    const stripWidth = strips[0].width
    ctx.clearRect(0, 0, width, height)
    strips.forEach((strip, i) => ctx.putImageData(strip, i * stripWidth, 0))
    return ctx
  }

  let strips = cut(ctx)
  strips = shuffle(strips)
  return draw(strips)
}
