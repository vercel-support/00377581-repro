export * from './environment';

/**
 * Get all values from object as an array with correct types
 */
export const getTypedValues = <T extends Record<string, any>>(obj: T) => {
  return Object.values(obj) as [(typeof obj)[keyof T]];
};
