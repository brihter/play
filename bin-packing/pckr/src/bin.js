const Bin = (cfg = {}) => {
  cfg = Object.assign({
    stack: 'vertical',
    width: 0,
    height: 0
  }, cfg)

  const {
    stack,
    width,
    height
  } = cfg

  const capacity = {
    available: stack === 'vertical' ? width : height,
    total: stack === 'vertical' ? width : height
  }

  const getCapacity = () => capacity
  
  const items = []

  const getItems = () => items

  const add = (item) => {
    const dimension = stack === 'vertical' ? 0 : 1
    const value = item[dimension]

    items.push(item)
    capacity.available -= value

    return items
  }

  return {
    width,
    height,
    
    getCapacity,
    getItems,
    add
  }
}

export { Bin }
