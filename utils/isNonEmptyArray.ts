export const isNonEmptyArray = (value: any) => {
  return value && Array.isArray(value) && value.length > 0
}
