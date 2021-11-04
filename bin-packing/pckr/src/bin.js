// const binSize = (cfg.stack === 'vertical') ? Math.floor(cfg.height / cfg.bins) : Math.floor(cfg.width / cfg.bins)

const Bin = (cfg = {}) => {
  cfg = Object.assign({
    width: 100,
    height: 100,
    boxCfg: {}
  }, cfg)

  let capacity = 0

  return {
    cfg,
    capacity
  }
}

export { Bin }
