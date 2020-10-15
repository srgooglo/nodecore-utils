import { objectToFunction } from '../src'

describe('objectToFunction', () => {
  it('Should output correct value', () => {
    const o = {
      a: 'foo',
      5: 'bar',
      key: 69,
    } as const

    const func = objectToFunction(o)
    for (const [k, v] of Object.entries(o)) {
      // @ts-ignore
      expect(func(k)).toBe(v)
    }
    // @ts-ignore
    expect(func('absentkey')).toBe(undefined)
  })

  it('Should work for arrays', () => {
    const arr = [
      'foo',
      'bar',
      'baz',
      'quux',
    ] as const

    const func = objectToFunction(arr)
    for (let i = 0; i < arr.length; ++i) {
      expect(func(i)).toBe(arr[i])
    }
    // @ts-ignore
    expect(func('absentkey')).toBe(undefined)
  })
})
