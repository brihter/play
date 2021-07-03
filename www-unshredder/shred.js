const shred = (ctx, opts) => {
  opts = Object.assign({
    width: 4
  }, opts)

  const cut = (ctx) => {
    const width = ctx.canvas.width
    const height = ctx.canvas.height
    const steps = width / opts.width

    return Array.from(Array(steps).keys())
      .map((el, i) => {
        const offset = i * opts.width
        const chunk = ctx.getImageData(offset, 0, offset + opts.width, height)

        return {
          data: chunk,
          width: opts.width
        }
      })
  }

  const shuffle = (buffer) => {
    return buffer.sort(() => 0.5 - Math.random())
  }

  const buffer = cut(ctx)
  return shuffle(buffer)
}
