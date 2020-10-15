import { hasDuplicates } from '../src'

describe('hasDuplicates', () => {
  it('Should work with an array without duplicates', () => {
    const arr = [
      1,
      2,
      3,
      4,
    ]
    const result = hasDuplicates(arr)
    expect(result).toBe(false)
  })

  it('Should work with an array without duplicates', () => {
    const arr = [
      1,
      2,
      3,
      4,
      2,
    ]
    const result = hasDuplicates(arr)
    expect(result).toBe(true)
  })

  it('Should work with an empty array', () => {
    const arr = [] as const
    const result = hasDuplicates(arr)
    expect(result).toBe(false)
  })

  it('Should work with different types', () => {
    const arr = [
      2,
      '2',
    ]
    const result = hasDuplicates(arr)
    expect(result).toBe(false)
  })

  it('Should work with undefined values', () => {
    const arr = [
      1,
      2,
      3,
      undefined,
      undefined,
    ]
    const result = hasDuplicates(arr)
    expect(result).toBe(true)
  })

  it('Should work with equal objects', () => {
    const arr = [
      { a: 5 },
      { a: 5 },
    ]
    const result = hasDuplicates(arr)
    expect(result).toBe(false)
  })
})
