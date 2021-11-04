import { Box } from './packer/index.js'
import { Layer, Shape } from './painter/index.js'

const background = Layer().create('background')
const boxLayer = Layer().create('box')
const rectangleLayer = Layer().create('rectangles')

const render = (box) => {
  const renderBox = (box) => {
    Shape.rectangle(boxLayer, {
      x: 0,
      y: 0,
      width: box.cfg.width,
      height: box.cfg.height,
      fillStyle: '#eee'
    })    
  }

  const renderBin = (bin, index) => {
    const renderItem = (item, ix) => {
      const w = item[0]
      const h = item[1]
  
      Shape.rectangle(rectangleLayer, {
        x: prevX,
        y: prevY,
        width: w,
        height: h,
        fillStyle: '#aaa'
      })
  
      prevX += w // rect padding right
    }

    let prevX = 0
    const items = bin.getItems()
    items.forEach(renderItem)
    prevY = (index * 10) // rect padding bottom
  }
  
  let prevY = 0
  renderBox(box)
  box.bins.forEach(renderBin)
}

const box = Box({
  width: 600,
  height: 200,
  bins: 20,
  stack: 'vertical',
  items: Array(140)
    .fill(0)
    .map(() => [
      _.random(40, 120),10]
    )
})

render(box)
