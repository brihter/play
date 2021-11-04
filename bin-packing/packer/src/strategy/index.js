import { bestFit } from './bestfit.js'

const resolveStrategy = (strategy = '') => {
  if (strategy === 'bestfit') {
    return bestFit
  }
}

export {
  resolveStrategy
}
