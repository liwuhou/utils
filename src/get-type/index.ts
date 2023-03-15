/** 数据类型 */
export enum TYPE {
  Array = 'Array',
  Object = 'Object',
  Map = 'Map',
  WeakMap = 'WeakMap',
  Set = 'Set',
  WeakSet = 'WeakSet',
  RegExp = 'RegExp',
  ArrayBuffer = 'ArrayBuffer',
  Null = 'Null',
  Date = 'Date',
  Error = 'Error',
  Promise = 'Promise',
  String = 'String',
  Number = 'Number',
  Boolean = 'Boolean',
  Undefined = 'Undefined',
  Function = 'Function',
  BigInt = 'BigInt',
  Symbol = 'Symbol',
  Unknown = 'Unknown'
}

/**
 * 获取数据的类型，使用 Object.prototype.toString 方法
 * @param {*} data any
 * @returns DATA
 */
export type GetType = (data: unknown) => TYPE
export const getType: GetType = (data) => {
  const dateType = Object.prototype.toString.call(data).slice(8, -1) as TYPE
  return TYPE?.[dateType] ?? TYPE.Unknown
}