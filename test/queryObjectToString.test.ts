import { queryObjectToString } from '../src'

const objects = {
  empty: {},

  null: null,

  undefined: undefined,

  'normal object': {
    a: 5,
    b: 'foo',
    tr: true,
    fs: false,
    trs: 'true',
    fss: 'false',
    emptystring: '',
    d: new Date('2019-11-22T22:17:17.771Z'),
    ud: undefined,
  },

  'multicase object': {
    snake_case: 'val',
    camelCase: 'val',
    Capital: 'val',
    ALL_CAPS: 'val',
  },

  'object with numeric keys': {
    11: 'eleven',
    0: 'zero',
  },

  'non-english object': {
    ключ: 'значение',
    anahtar: 'değer',
    Schlüssel: 'Werte',
  },

  'weird object': {
    twowords: 'kaksi sanaa',
    'with space': 'space',
    $dlr: 'val',
    _us_: 'underscore',
  },
} as const

describe('sliceRotate', () => {
  for (const [name, o] of Object.entries(objects)) {
    it(`should convert ${name} correctly`, () => {
      // @ts-ignore
      const result = queryObjectToString(o)
      expect(result).toMatchSnapshot()
    })
  }
})
