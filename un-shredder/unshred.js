const unshred = (ctx, opts) => {
  opts = Object.assign({
    width: 50
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

  const strips = cut(ctx)
  const pairs = compare(strips)
  console.log(pairs)

  return ctx
}
