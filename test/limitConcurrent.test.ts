import { range } from 'lodash'

import {
  delay,
  limitConcurrent,
} from '../src'

async function func(arr: boolean[]) {
  arr.push(true)
  await delay(Math.random() * 10)
  arr.push(false)
}

describe('limitConcurrent', () => {
  it('Should have the default parameter as Infinity', () => {
    expect(limitConcurrent(func, Infinity)).toBe(func)
    expect(limitConcurrent(func)).toBe(limitConcurrent(func, Infinity))
  })

  it('Should throw on a negative value', () => {
    expect(() => limitConcurrent(func, -1)).toThrowErrorMatchingSnapshot()
  })

  it('Should throw on zero', () => {
    expect(() => limitConcurrent(func, 0)).toThrowErrorMatchingSnapshot()
  })

  it('Should throw on a non-integer value', () => {
    expect(() => limitConcurrent(func, Math.PI)).toThrowErrorMatchingSnapshot()
  })

  it('Should not throw on positive infinity', () => {
    expect(() => limitConcurrent(func, Infinity)).not.toThrow()
  })

  for (let i = 1; i < 3; ++i) {
    it(`Should have no more than ${i} instances concurrently`, async () => {
      const lockedFunc = limitConcurrent(func, i)
      const bools: boolean[] = []
      const promises = range(10).map(() => lockedFunc(bools))
      await Promise.all(promises)
      let count = 0
      for (const v of bools) {
        if (v) {
          ++count
        } else {
          --count
        }
        expect(count).toBeLessThanOrEqual(i)
        expect(count).toBeGreaterThanOrEqual(0)
      }
    })
  }
})
