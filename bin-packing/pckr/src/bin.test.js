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
})
