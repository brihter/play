const { Group } = require('./group')

describe('Group', () => {
  it('use defaults', () => {
    const group = Group()

    expect(group.width).to.eql(100)
    expect(group.height).to.eql(100)
    expect(group.bins).to.eql(1)
    expect(group.stack).to.eql('vertical')
  })

  it('use config', () => {
    const group = Group({
      width: 1000,
      height: 1000,
      bins: 5,
      stack: 'horizontal'
    })

    expect(group.width).to.eql(1000)
    expect(group.height).to.eql(1000)
    expect(group.bins).to.eql(5)
    expect(group.stack).to.eql('horizontal')
  })

  it.skip('should create bins', () => {
    // ...
  })

  describe('pack()', () => {
    it('should pack items into bins', () => {
      const group = Group({
        width: 100,
        height: 10,
        bins: 1,
        stack: 'vertical'
      })

      const result = group.pack([100])
    })
  })
})
