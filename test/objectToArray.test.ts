import { objectToArray, __legacy__objectToArray } from '../src'

describe('objectToArray', () => {
  it('Should convert object to array', () => {
    const o = {
      3: 'd',
      '10': 'k',
      '0': 'a',
      '1': 'b',
      '6': 'g',
      8: 'i',
      11: 'l',
      '4': 'e',
      7: 'h',
      13: 'n',
      '9': 'j',
      '12': 'm',
      '2': 'c',
      5: 'f',
    }
    const result = objectToArray(o)
    expect(result).toMatchSnapshot()
  })
})

describe('__legacy__objectToArray', () => {
  it('Should convert object to array of objects with schema key/value', () => {
    const o = {
      test1: '1test',
      'test2': '2test',
      '0': 'a',
      '1': 'b',
      '6': 'g',
      8: 'i',
      11: 'l',
      '4': 'e',
      7: 'h',
      13: 'n',
      '9': 'j',
      '12': 'm',
      '2': 'c',
      5: 'f',
    }
    const result = __legacy__objectToArray(o)
    expect(result).toMatchSnapshot()
  })
})