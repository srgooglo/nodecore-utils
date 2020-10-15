import { isNonNegativeInteger } from '../src'

import numbers from './data/numbers'

describe('isNonNegativeInteger', () => {
  for (const n of numbers) {
    it(`Should isNonNegativeInteger(${n}) correctly`, () => {
      const result = isNonNegativeInteger(n)
      expect(result).toMatchSnapshot()
    })
  }
})
