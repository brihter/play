import { Bin } from './bin.js'

const Box = (cfg = {}) => {
  cfg = Object.assign({
    width: 100,
    height: 100,
    bins: 1,
    stack: 'vertical'
  }, cfg)


  const bins = Array(cfg.bins).fill(Bin({
    boxCfg: cfg
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
