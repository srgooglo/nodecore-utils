import { isPositiveInteger, isNaturalNumber } from '../src'

import numbers from './data/numbers'

describe('isPositiveInteger', () => {
  for (const n of numbers) {
    it(`Should isPositiveInteger(${n}) correctly`, () => {
      const result = isPositiveInteger(n)
      expect(result).toBe(isNaturalNumber(n))
      expect(result).toMatchSnapshot()
    })
  }
})
