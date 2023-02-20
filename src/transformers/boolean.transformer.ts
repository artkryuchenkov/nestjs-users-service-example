export function toBoolean(value: string): boolean {
  return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
}
