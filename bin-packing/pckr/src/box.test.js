import { Box } from './box.js'

describe('Box', () => {
  it('should use defaults', () => {
    const box = Box()

    expect(box.cfg.width).to.eql(100)
    expect(box.cfg.height).to.eql(100)
    expect(box.cfg.bins).to.eql(1)
    expect(box.cfg.stack).to.eql('vertical')
  })

  it('should use config', () => {
    const box = Box({
      width: 1000,
      height: 1000,
      bins: 5,
      stack: 'horizontal'
    })

    expect(box.cfg.width).to.eql(1000)
    expect(box.cfg.height).to.eql(1000)
    expect(box.cfg.bins).to.eql(5)
    expect(box.cfg.stack).to.eql('horizontal')
  })

  it('should create bins', () => {
    const box = Box({
      width: 10,
      height: 2,
      bins: 2,
      stack: 'vertical'
    })

    expect(box.bins.length).to.eql(2)
  })

  describe('pack()', () => {
    it('should pack items into one bin perfectly', () => {
      const box = Box({
        width: 10,
        height: 2,
        bins: 2,
        stack: 'vertical'
      })

      const result = box.pack([
        [5,1],
        [3,1]
        [2,1]
      ])
      
      // console.log(result)
    })
  })
})
