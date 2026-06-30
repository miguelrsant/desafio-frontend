export function formatUnknown(value: string) {
  if (value.toLowerCase() === 'unknown') {
    return 'Desconhecido';
  }

  return value;
}
