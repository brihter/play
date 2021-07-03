const shred = (ctx, opts) => {
  opts = Object.assign({
    width: 4
  }, opts)

  const cut = (ctx) => {
    const steps = ctx.canvas.width / opts.width
    return Array.from(Array(steps).keys())
      .map((el, i) => ctx.getImageData(i * opts.width, 0, i * opts.width + opts.width, ctx.canvas.height))
  }
  
  const shuffle = (strips) => {
    return strips.sort(() => 0.5 - Math.random())
  }
  
  const write = (strips, ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    strips.forEach((strip, i) => ctx.putImageData(strip, i * opts.width, 0))
    return ctx
  }

  let strips = cut(ctx)
  strips = shuffle(strips)
  return write(strips, ctx)
}
