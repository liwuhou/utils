import { describe, test, expect } from 'vitest'
import { equal } from '../src/fast-dep-equal/index'

const emptyFn = () => {/***/ }
const sym = Symbol('test')
const today = new Date()
const nextDay = new Date()
nextDay.setDate(nextDay.getDate() + 1)

describe('fast-deep-equal', () => {
  test('Basic data test', () => {
    expect(equal('xiaoe', 'elive')).toBeFalsy()
    expect(equal('', '')).toBeTruthy()
    expect(equal(1, 1)).toBeTruthy()
    expect(equal(true, false)).toBeFalsy()
    expect(equal(false, false)).toBeTruthy()
    expect(equal(/\s/, /\s+/g)).toBeFalsy()
    expect(equal(/\s/, /\s/g)).toBeFalsy()
    expect(equal(/\s/, /\s/)).toBeTruthy()
    expect(equal(undefined, null)).toBeFalsy()
    expect(equal(Symbol(1), Symbol(1))).toBeFalsy()
    expect(equal(sym, sym)).toBeTruthy()
    /** @ts-expect-error 在 ts 环境，a，b 两个参数如果类型不一致不会通过类型检查，这里模拟一下没有 ts checker 的情况 */
    expect(equal('1', 1)).toBeFalsy()
    /** @ts-expect-error: 同上 */
    expect(equal(BigInt(1), 1)).toBeFalsy()
    expect(equal(BigInt(1), BigInt(1))).toBeTruthy()
  })

  test('Complex data test', () => {
    // example
    const obj1 = { name: 'william', job: 'engineer' }
    const obj2 = { ...obj1 }
    const obj3 = { ...obj1, age: NaN }
    const arr1 = [{ id: '123456', obj: obj1 }, obj1]
    const arr2 = [{ id: '123456', obj: obj2 }, obj2]
    const arr3 = [{ id: '654321', }, obj2]

    expect(equal(null, null)).toBeTruthy()
    expect(equal(today, nextDay)).toBeFalsy()
    expect(equal(new Error('test'), new Error(''))).toBeFalsy()
    expect(equal(new Error('test'), new Error('test'))).toBeTruthy()
    expect(equal(new Promise(emptyFn), new Promise(emptyFn))).toBeTruthy()
    expect(equal(new Promise(emptyFn), new Promise((resolve) => resolve(1)))).toBeTruthy()
    expect(equal(obj1, obj2)).toBeTruthy()
    expect(equal(obj1, obj3)).toBeFalsy()
    expect(equal(arr1, arr2)).toBeTruthy()
    expect(equal(arr1, arr3)).toBeFalsy()
  })

})