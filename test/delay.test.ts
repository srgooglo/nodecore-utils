import { delay } from '../src'

describe('delay', () => {
  it('Should work', async () => {
    const arr: string[] = []
    const promise = delay(100).then(() => {
      arr.push('foo')
    })
    arr.push('bar')
    await promise
    expect(arr).toMatchSnapshot()
  })
})
