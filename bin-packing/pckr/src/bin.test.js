import { expect } from 'chai'
import { Bin } from './bin.js'

describe('Bin', () => {
  it('should use defaults', () => {
    const bin = Bin()

    expect(bin.width).to.eql(0)
    expect(bin.height).to.eql(0)
  })

  it('should use config', () => {
    const bin = Bin({
      width: 1000,
      height: 1000
    })

    expect(bin.width).to.eql(1000)
    expect(bin.height).to.eql(1000)
  })

  it('should have capacity #1', () => {
    const bin = Bin({
      width: 10,
      height: 1,
      stack: 'vertical'
    })

    const capacity = bin.getCapacity()
    expect(capacity.total).to.eql(10)
  })

  it('should have capacity #2', () => {
    const bin = Bin({
      width: 2,
      height: 20,
      stack: 'horizontal'
    })

    const capacity = bin.getCapacity()
    expect(capacity.total).to.eql(20)
  })

  describe('add()', () => {
    it('should add an item and reduce available capacity', () => {
      const bin = Bin({
        width: 10,
        height: 1,
        stack: 'vertical'
      })

      const items = bin.add([6, 1])
      const capacity = bin.getCapacity()
      const item1 = items[0]

      expect(items.length).to.eql(1)
      expect(item1).to.eql([6, 1])
      expect(capacity.available).to.eql(4)
    })
  })
})
