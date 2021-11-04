import { Bin } from './bin.js'

describe('Bin', () => {
  it('should use defaults', () => {
    const bin = Bin()

    expect(bin.cfg.width).to.eql(100)
    expect(bin.cfg.height).to.eql(100)
  })

  it('should use config', () => {
    const bin = Bin({
      width: 1000,
      height: 1000
    })

    expect(bin.cfg.width).to.eql(1000)
    expect(bin.cfg.height).to.eql(1000)
  })

  it('should have capacity', () => {
    const bin = Bin()

    expect(bin.capacity).to.eql(0)
  })
})
