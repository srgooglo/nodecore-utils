import { range } from 'lodash'

import {
  delay,
  lockAsync,
} from '../src'

async function func(val: number) {
  await delay(Math.random() * 10)
  return val
}

describe('lockAsync', () => {
  it('Should retain the array order', async () => {
    const lockedFunc = lockAsync(func)
    const result: number[] = []
    const promises = range(10).map(i => lockedFunc(i).then(r => result.push(r)))
    await Promise.all(promises)
    expect(result).toMatchSnapshot()
  })
})
