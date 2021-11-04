import { Bin } from './bin.js'

const Box = (cfg = {}) => {
  cfg = Object.assign({
    width: 100,
    height: 100,
    bins: 1,
    stack: 'vertical'
  }, cfg)


  const {
    width,
    height,
    stack,
    bins : binCount
  } = cfg

  const bins = Array(binCount).fill(Bin({
    stack,
    width: stack === 'vertical' ? width : width/binCount,
    height: stack === 'vertical' ? height/binCount : height
  }))

  const pack = (items = []) => {
    return bins
  }

  return {
    cfg,
    bins,

    pack
  }
}

export { Box }
