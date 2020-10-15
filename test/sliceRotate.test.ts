import { sliceRotate } from '../src'

describe('sliceRotate', () => {
  it('should convert to a rolled range correctly', () => {
    const result = sliceRotate([1, 2, 3, 4, 5], 3, 1)
    expect(result).toMatchSnapshot()
  })

  it('should convert to a serial range correctly', () => {
    const result = sliceRotate([1, 2, 3, 4, 5], 1, 4)
    expect(result).toMatchSnapshot()
  })
})
