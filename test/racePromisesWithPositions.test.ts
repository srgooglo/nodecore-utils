import {
  delay,
  racePromisesWithPositions,
} from '../src'

const SHORTEST = 10
const SHORT = 20
const LONG = 50
const LONGEST = 100

async function func(ms: number) {
  await delay(ms)
  return ms
}

describe('racePromisesWithPositions', () => {
  it('Should have 1 shortest winner', async () => {
    const longest = func(LONGEST)
    const longer = func(LONG)
    const shorter = func(SHORT)
    const shortest = func(SHORTEST)
    const indices = await racePromisesWithPositions([
      longest,
      longer,
      shorter,
      shortest,
    ], 1)
    expect(indices).toEqual([3])

    const shortestResult = await shortest
    expect(shortestResult).toBe(SHORTEST)

    const shorterResult = await shorter
    expect(shorterResult).toBe(SHORT)

    const longerResult = await longer
    expect(longerResult).toBe(LONG)

    const longestResult = await longest
    expect(longestResult).toBe(LONGEST)
  })

  it('Should have correct positions', async () => {
    const longest = func(LONGEST)
    const longer = func(LONG)
    const shorter = func(SHORT)
    const shortest = func(SHORTEST)
    const indices = await racePromisesWithPositions([
      longest,
      longer,
      shorter,
      shortest,
    ])
    expect(indices).toEqual([3, 2, 1, 0])

    const shortestResult = await shortest
    expect(shortestResult).toBe(SHORTEST)

    const shorterResult = await shorter
    expect(shorterResult).toBe(SHORT)

    const longerResult = await longer
    expect(longerResult).toBe(LONG)

    const longestResult = await longest
    expect(longestResult).toBe(LONGEST)
  })
})
