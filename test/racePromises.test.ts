import {
  delay,
  racePromises,
} from '../src'

const SHORT = 10
const LONG = 50

async function func(ms: number) {
  await delay(ms)
  return ms
}

describe('racePromises', () => {
  it('Should have the shorter one coming first the winner', async () => {
    const shorter = func(SHORT)
    const longer = func(LONG)
    const index = await racePromises([
      shorter,
      longer,
    ])
    expect(index).toBe(0)

    const shorterResult = await shorter
    expect(shorterResult).toBe(SHORT)

    const longerResult = await longer
    expect(longerResult).toBe(LONG)
  })

  it('Should have the shorter one coming last the winner', async () => {
    const longer = func(LONG)
    const shorter = func(SHORT)
    const index = await racePromises([
      longer,
      shorter,
    ])
    expect(index).toBe(1)

    const shorterResult = await shorter
    expect(shorterResult).toBe(SHORT)

    const longerResult = await longer
    expect(longerResult).toBe(LONG)
  })
})
