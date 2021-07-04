const unshred = (ctx, opts) => {
  opts = Object.assign({
    width: 200
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

  const compare = (strips) => {
    let i
    let j
    let s1
    let s2

    const results = []
    for (i=0; i<strips.length; ++i) {
      s1 = strips[i]
      for (j=0; j<strips.length; ++j) {
        s2 = strips[j]

        if (i === j) {
          continue
        }

        results.push({
          index1: i,
          index2: j,
          d: diff(s1, s2)
        })
      }
    }

    return results
  }

  // todo
  const order = (strips, distances) => {
    return strips
  }

  const draw = (strips) => {
    const stripWidth = strips[0].width
    ctx.clearRect(0, 0, width, height)
    strips.forEach((strip, i) => ctx.putImageData(strip, i * stripWidth, 0))
    return ctx
  }

  let strips = cut(ctx)
  const distances = compare(strips)
  strips = order(strips, distances)
  return draw(strips)
}
