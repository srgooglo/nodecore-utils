import { memoizeWeak } from '../src'

interface Obj {
  a: number,
  b: string,
  c: number,
}

describe('memoizeWeak', () => {
  it('Should return the same result as the original', () => {
    const foo = (o: Obj) =>
      o.a + o.c

    const memoizedFoo = memoizeWeak(foo)

    const obj = {
      a: 7,
      b: 'str',
      c: 10,
    }

    const res1 = foo(obj)
    const res2 = memoizedFoo(obj)
    expect(res1).toBe(res2)
  })

  it('Should throw when the argument is a primitive', () => {
    const double = (n: number) =>
      n * 2

    // @ts-ignore
    const memoizedDouble = memoizeWeak(double)
    // @ts-ignore
    expect(() => memoizedDouble(42)).toThrowErrorMatchingSnapshot()
  })

  it('Should not recompute value multiple times', () => {
    let computed = 0

    const foo = (o: Obj) => {
      ++computed
      return o.a + o.c
    }

    const obj = {
      a: 7,
      b: 'str',
      c: 10,
    }

    const memoizedFoo = memoizeWeak(foo)

    memoizedFoo(obj)
    memoizedFoo(obj)
    memoizedFoo(obj)

    expect(computed).toBe(1)

    memoizedFoo({
      ...obj,
    })

    expect(computed).toBe(2)
  })
})
