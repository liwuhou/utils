import { TYPE, getType } from "../index.js";


/**
 * 快速判断两个数据是否相等
 * @param {*} a any
 * @param {*} b any
 * @returns boolean
 */
export function equal<T extends unknown>(a: T, b: T): boolean {
  if (Object.is(a, b)) return true

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    if (a?.constructor !== b?.constructor) return false

    if (getType(a) === TYPE.Array || getType(a) === TYPE.ArrayBuffer) {
      return isArrayEqual(a, b)
    }

    if (getType(a) === TYPE.Map) {
      return isMapEqual(a, b)
    }

    if (getType(a) === TYPE.Set) {
      return isSetEqual(a, b)
    }

    // if (a.constructor === RegExp && b.constructor === RegExp) {
    if (getType(a) === TYPE.RegExp && getType(b) === TYPE.RegExp) {
      return isRegExpEqual(a, b)
    }

    if (a.valueOf !== Object.prototype.valueOf) {
      return a.valueOf() === b.valueOf()
    }

    if (a.toString !== Object.prototype.toString) {
      return a.toString() === b.toString()
    }

    // Object type
    return isObjectEqual(a, b)
  }

  // NaN case
  return a !== a && b !== b
}

/**
 * 判断两个对象是否相等
 * @param {*} a Object
 * @param {*} b Object
 */
export function isObjectEqual(a, b) {
  const keys = Reflect.ownKeys(a)
  const length = keys.length
  let i

  if (length !== Reflect.ownKeys(b).length) return false

  for (const key of keys) {
    if (!Reflect.has(b, key)) return false
    if (!equal(a[key], b[key])) return false
  }

  return true
}

/**
 * 判断两数组是否相等
 * @param {*} a Array
 * @param {*} b Array
 * @returns 
 */
export function isArrayEqual(a, b) {
  if (a?.length !== b?.length) return false

  for (let i = a.length; i !== 0; i--) {
    if (equal(a[i], b[i])) return false
  }

  return true
}

/**
 * 判断两个 Map 实例数据是否相等
 * @param {*} a Map 
 * @param {*} b Map 
 * @returns boolean
 */
export function isMapEqual(a, b) {
  if (a?.size !== b?.size) return false

  for (let [key, value] of a.entries()) {
    if (!b.has(key)) return false
    if (!equal(value, b.get(key))) return false
  }

  return true
}

/**
 * 判断两个 Set 实例数据是否相等
 * @param {*} a Set
 * @param {*} b Set
 * @returns boolean
 */
export function isSetEqual(a, b) {
  if (a?.size !== b?.size) return false

  for (let item of a.entries()) {
    if (!b.has(item[0])) return false
  }

  return true
}

/**
 *  判断两个正则是否相等
 * @param {*} a RegExp
 * @param {*} b RegExp
 * @returns boolean
 */
export function isRegExpEqual(a, b) {
  return a?.source === b?.source && a?.flags === b?.flags
}