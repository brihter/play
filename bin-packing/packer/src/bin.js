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

  const getValue = (item) => {
    const dimension = stack === 'vertical' ? 0 : 1
    return item[dimension]
  }
  
  const add = (item) => {
    items.push(item)
    capacity.available -= getValue(item)
    return items
  }

  return {
    width,
    height,
    
    getCapacity,
    getItems,
    getValue,
    add
  }
}

export { Bin }
