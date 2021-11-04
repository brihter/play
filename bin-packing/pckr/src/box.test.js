import { Box } from './box.js'

describe('Box', () => {
  it('use defaults', () => {
    const box = Box()

    expect(box.width).to.eql(100)
    expect(box.height).to.eql(100)
    expect(box.bins).to.eql(1)
    expect(box.stack).to.eql('vertical')
  })

  it('use config', () => {
    const box = Box({
      width: 1000,
      height: 1000,
      bins: 5,
      stack: 'horizontal'
    })

    expect(box.width).to.eql(1000)
    expect(box.height).to.eql(1000)
    expect(box.bins).to.eql(5)
    expect(box.stack).to.eql('horizontal')
  })

  it.skip('should create bins', () => {
    // ...
  })

  describe('pack()', () => {
    it('should pack items into bins', () => {
      const box = Box({
        width: 100,
        height: 10,
        bins: 1,
        stack: 'vertical'
      })

      const result = box.pack([100])
    })
  })
})
