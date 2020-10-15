import { toNearestByStep } from '../src'

import numbers from './data/numbers'

const steps = [
  0.001,
  0.002,
  0.005,
  Infinity,
  -0.001,
  1 / 300,
  100,
  0,
  NaN,
  true,
  false,
  '',
  null,
  undefined,
]

describe('toNearestByStep', () => {
  for (const n of numbers) {
    for (const step of steps) {
      it(`Should toNearestByStep(${n}, ${step}) correctly`, () => {
        // @ts-ignore
        const result = toNearestByStep(n, step)
        expect(result).toMatchSnapshot()
      })
    }
  }
})
