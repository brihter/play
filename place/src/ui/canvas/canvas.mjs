import operations from './operations/index.mjs'
import handlers from './handlers/index.mjs'
import constraints from './constraints/index.mjs'

class Canvas {
  _render = {
    vw: 0,
    vh: 0,
    centerX: 0,
    centerY: 0
  }

  constructor(cfg = {}) {
    const canvas = this.render(cfg)

    this.registerOperations(canvas)
    this.registerHandlers(canvas)
    this.registerConstraints(canvas)
  }

  render(cfg) {
    const canvas = document.createElement('canvas')
    canvas.width = cfg.width
    canvas.height = cfg.height

    const target = document.querySelector(cfg.renderTo)
    target.appendChild(canvas)
    this.afterRender()

    return canvas
  }

  afterRender() {
    const round = (value) => parseInt(value.toFixed(0))

    this._render.vw = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    )
    this._render.vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    )
    this._render.centerX = round(this._render.vw / 2)
    this._render.centerY = round(this._render.vh / 2)
  }

  registerOperations(canvas) {
    operations.reduce((cls, registerFn) => {
      const { name, fn } = registerFn(this, canvas)
      cls[name] = fn
      return cls
    }, this)
  }

  registerHandlers(canvas) {
    handlers.forEach((handler) => handler(this, canvas))
  }

  registerConstraints(canvas) {
    constraints.forEach((interceptor) => interceptor(this, canvas))
  }
}

export { Canvas }
