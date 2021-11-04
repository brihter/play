const Bin = (cfg = {}) => {
  cfg = Object.assign({
    width: 0,
    height: 0
  }, cfg)

  const {
    width,
    height
  } = cfg

  return {
    cfg,
    width,
    height
  }
}

export { Bin }
