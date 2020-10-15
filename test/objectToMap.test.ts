import { objectToMap } from '../src'

describe('objectToMap', () => {
  it('Should output correct value', () => {
    const o = {
      a: 'foo',
      5: 'bar',
      key: 69,
    } as const

    const map = objectToMap(o)
    for (const [k, v] of Object.entries(o)) {
      expect(map.get(k)).toBe(v)
    }
    expect(map.has('absentKey')).toBe(false)
  })
})
