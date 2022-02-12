export const uuid = (): string => Math.random().toString(36).substring(3);

const isType = (type: string) => {
  return (value: any) => Object.prototype.toString.call(value) === `[object ${type}]`;
};
export const isString = isType('String');
export const isFunction = isType('Function');
export const isPlainObject = isType('Object');
export const isPromise = isType('Promise');
