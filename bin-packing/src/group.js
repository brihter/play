const Group = (cfg = {}) => {
  cfg = Object.assign({
    width: 100,
    height: 100,
    bins: 1,
    stack: 'vertical'
  }, cfg)

  let bins = []

  const pack = (items = []) => {
    return bins
  }

  return {
    width: cfg.width,
    height: cfg.height,
    bins: cfg.bins,
    stack: cfg.stack,

    pack
  }
}

if (module) {
  module.exports = { Group }
}
