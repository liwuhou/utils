import { describe, test, expect } from 'vitest'
import { TYPE, getType } from "../src/get-type";

const types = Reflect.ownKeys(TYPE) as TYPE[];
const values = [
  [],
  {},
  new Map(),
  new WeakMap(),
  new Set(),
  new WeakSet(),
  /\s/,
  new ArrayBuffer(1),
  null,
  new Date(),
  new Error(),
  new Promise(() => { }),
  '',
  1,
  true,
  undefined,
  () => { },
  BigInt(1),
  Symbol(),
  new Int16Array(1)
];

describe("get-type", () => {
  test("test basic", () => {
    types.forEach((type, idx) => {
      expect(getType(values[idx])).toBe(TYPE[type])
    })
  });
});
