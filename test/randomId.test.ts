import { randomId } from '../src'

const ALPHANUMERIC_RE = /^[a-z0-9]+$/

describe('randomId', () => {
  it('it should be alphanumeric', () => {
    const result = randomId()
    expect(result).toMatch(ALPHANUMERIC_RE)
  })
})
