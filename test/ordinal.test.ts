import { range } from 'lodash'

import { ordinal } from '../src'

const numbers = range(1, 105)

const badNumbers = [
  0,
  -2,
  3.5,
  Infinity,
]

describe('ordinal', () => {
  for (const n of numbers) {
    it(`Should ordinal(${n}) correctly`, () => {
      const result = ordinal(n)
      expect(result).toMatchSnapshot()
    })
  }

  for (const n of badNumbers) {
    it(`Should throw on ordinal(${n})`, () => {
      expect(() => ordinal(n)).toThrowErrorMatchingSnapshot()
    })
  }
})
