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

  const order = (strips) => {
    const compare = () => {
      let i
      let j
      let s1
      let s2

      const pairs = []
      for (i = 0; i < strips.length; ++i) {
        s1 = strips[i]
        for (j = 0; j < strips.length; ++j) {
          s2 = strips[j]

          if (i === j) {
            continue
          }

          pairs.push({
            index1: i,
            index2: j,
            strip1: s1,
            strip2: s2
          })
        }
      }

      return diff(pairs)
    }

    const match = (scores) => {
      return _.chain(scores)
        .groupBy('index1')
        .map((candidates) => {
          const sorted = _.orderBy(candidates, ['diff'], ['asc'])
          const winner = sorted[0]

          return {
            diff: winner.diff,
            index: winner.index2,
            first: false,
            last: false
          }
        })
        .value()
    }

    const last = (matches) => {
      const diffs = matches.map(m => m.diff)
      const index = diffs.indexOf(Math.max(...diffs))
      matches[index].last = true
      return matches
    }

    const first = (matches) => {
      const pointers = matches.filter(m => m.last === false).map(m => m.index)

      const a = new Set(matches.keys())
      const b = new Set(pointers)

      const index = [...a].filter(x => !b.has(x)).pop()
      matches[index].first = true
      return matches
    }

    const move = (matches) => {
      let index = matches.findIndex(m => m.first === true)
      let current = matches[index]

      const results = []
      while (!current.last) {
        results.push(strips[index])
        index = current.index
        current = matches[index]
      }

      results.push(strips[index])

      return results
    }

    const scores = compare()

    let matches = match(scores)
    matches = last(matches)
    matches = first(matches)

    return move(matches)
  }

  const draw = (strips) => {
    const stripWidth = strips[0].width
    ctx.clearRect(0, 0, width, height)
    strips.forEach((strip, i) => ctx.putImageData(strip, i * stripWidth, 0))
    return ctx
  }

  let strips = cut(ctx)
  strips = order(strips)
  return draw(strips)
}
