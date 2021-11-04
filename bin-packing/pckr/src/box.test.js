import { expect } from 'chai'
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

  it('should set the correct capacity based on the bounding box #1', () => {
    const box = Box({
      width: 10,
      height: 1,
      bins: 1,
      stack: 'vertical'
    })

    const bin = box.bins[0]
    expect(bin.width).to.eql(10)
    expect(bin.height).to.eql(1)
  })

  it('should set the correct capacity based on the bounding box #2', () => {
    const box = Box({
      width: 10,
      height: 2,
      bins: 2,
      stack: 'vertical'
    })

    const bin1 = box.bins[0]
    expect(bin1.width).to.eql(10)
    expect(bin1.height).to.eql(1)

    const bin2 = box.bins[1]
    expect(bin2.width).to.eql(10)
    expect(bin2.height).to.eql(1)
  })

  it('should set the correct capacity based on the bounding box #3', () => {
    const box = Box({
      width: 10,
      height: 3,
      bins: 2,
      stack: 'vertical'
    })

    const bin1 = box.bins[0]
    expect(bin1.width).to.eql(10)
    expect(bin1.height).to.eql(1.5)

    const bin2 = box.bins[1]
    expect(bin2.width).to.eql(10)
    expect(bin2.height).to.eql(1.5)
  })

  describe('pack()', () => {
    it('should pack items into a bin', () => {
      const box = Box({
        width: 10,
        height: 1,
        bins: 1,
        stack: 'vertical'
      })

      const bins = box.pack([
        [5,1],
        [3,1],
        [2,1]
      ])
      
      const bin1 = bins[0]
      expect(bin1.getItems()).to.eql([
        [5,1],
        [3,1],
        [2,1]
      ])
    })

    it('should pack items into two bins #1', () => {
      const box = Box({
        width: 2,
        height: 2,
        bins: 2,
        stack: 'vertical'
      })

      const bins = box.pack([
        [2,1],
        [2,1]
      ])
      
      const bin1 = bins[0].getItems()
      const bin2 = bins[1].getItems()

      expect(bin1).to.eql([[2,1]])
      expect(bin2).to.eql([[2,1]])
    })

    it('should pack items into two bins #2', () => {
      const box = Box({
        width: 3,
        height: 2,
        bins: 2,
        stack: 'vertical'
      })

      const bins = box.pack([
        [2,1],
        [3,1]
      ])
      
      const bin1 = bins[0].getItems()
      const bin2 = bins[1].getItems()

      expect(bin1).to.eql([[2,1]])
      expect(bin2).to.eql([[3,1]])
    })

    it('should pack items into two bins #3', () => {
      const box = Box({
        width: 10,
        height: 2,
        bins: 2,
        stack: 'vertical'
      })

      const bins = box.pack([
        [2,1],
        [3,1],
        [8,1],
        [3,1]
      ])
      
      const bin1 = bins[0].getItems()
      const bin2 = bins[1].getItems()

      expect(bin1).to.eql([
        [2,1],
        [3,1],
        [3,1]
      ])

      expect(bin2).to.eql([
        [8,1]
      ])
    })
  })
})
