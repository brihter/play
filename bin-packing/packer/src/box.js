import { Bin } from './bin.js'

import { resolveStrategy } from './strategy/index.js'

const Box = (cfg = {}) => {
  cfg = Object.assign({
    width: 100,
    height: 100,
    bins: 1,
    stack: 'vertical',
    items: []
  }, cfg)

  const {
    width,
    height,
    stack,
    bins : binCount
  } = cfg

  const bins = Array(binCount)
    .fill(0)
    .map(i => Bin({
      stack,
      width: stack === 'vertical' ? width : width/binCount,
      height: stack === 'vertical' ? height/binCount : height
    }))

  const pack = (items = [], opts = {}) => {
    opts = Object.assign({
      strategy: 'bestfit'
    }, opts)

    const strategy = resolveStrategy(opts.strategy)

    const add = (item) => {
      const index = strategy(bins, item)
      if (index < 0) {
        console.warn('item doesnt fit', item)
        return
      }

      const bin = bins[index]
      bin.add(item)
    }

    items.forEach(add)
    return bins
  }

  const align = () => {
    return bins
  }
  
  // init
  pack(cfg.items)
  
  return {
    cfg,
    bins,

    pack,
    align
  }
}

export { Box }
