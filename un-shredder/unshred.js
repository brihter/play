const unshred = (ctx, opts) => {
  opts = Object.assign({
    width: 10
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

  let strips = cut(ctx)
  const x = diff(strips[0], strips[1])
  console.log(x)

  return ctx
}
