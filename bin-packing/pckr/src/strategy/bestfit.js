// the idea is to place the next item into the tightest spot
// that is, put it into the bin so that the smallest empty space is left

const find = (items = []) => {
  let lowest = -1
  for (let i = 0; i < items.length; i++) {
    const current = items[i]
    if (current < 0) {
      continue
    }

    if (!items[lowest]) {
      lowest = i
      continue
    }

    if (current < items[lowest]) {
      lowest = i
    }
  }

  return lowest
}

const bestFit = (bins = [], item = [], stack = '') => {
  const dimension = stack === 'vertical' ? 0 : 1
  const value = item[dimension]
  const capacities = bins.map(b => b.getCapacity().available - value)

  return find(capacities)
}

export {
  bestFit
}
