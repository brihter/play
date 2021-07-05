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

      const results = {}
      for (i = 0; i < strips.length; ++i) {
        s1 = strips[i]
        for (j = 0; j < strips.length; ++j) {
          s2 = strips[j]

          if (i === j) {
            continue
          }

          if (!results[i]) {
            results[i] = []
          }

          results[i].push({
            index: j,
            diff: diff(s1, s2)
          })
        }
      }

      return results
    }

    const match = (scores) => {
      return Object.keys(scores).map(index => {
        return scores[index].reduce((acc, { index, diff, surface }) => {
          if (diff < acc.diff) {
            acc.diff = diff
            acc.index = index
          }

          return acc
        }, {
          diff: Number.MAX_SAFE_INTEGER,
          index: -1,
          first: false,
          last: false
        })
      })
    }

    const markLast = (matches) => {
      const diffs = matches.map(m => m.diff)

      const index = diffs.indexOf(Math.max(...diffs))
      matches[index].last = true
      return matches
    }

    const markFirst = (matches) => {
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
    matches = markLast(matches)
    matches = markFirst(matches)
    //console.log(matches)

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
