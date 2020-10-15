import {
  stubFalse,
  isPlainObject,
} from 'lodash'

import { getObjectPaths } from '../src'

const o = {
  a: {
    b: {
      c: 'foo',
      m: 'bar',
    },
    d: 56,
  },
  e: null,
  f: {
    69: /foo/g,
  },
  numbers: {
    h: undefined,
    i: Infinity,
    j: NaN,
    k: 7,
    l: 0,
  },
} as const

describe('getObjectPaths', () => {
  it('Should output correct value (default)', () => {
    const result = getObjectPaths(o as any)
    expect(result).toMatchSnapshot()
  })

  it('Should output correct value (ignore non-plain objects)', () => {
    const result = getObjectPaths(o as any, (v) => !isPlainObject(v))
    expect(result).toMatchSnapshot()
  })

  it('Should output correct value (ignore foo)', () => {
    const result = getObjectPaths(o as any, stubFalse, (v) => v === 'foo')
    expect(result).toMatchSnapshot()
  })
})
