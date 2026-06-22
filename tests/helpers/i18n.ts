export function collectLeafKeys(
  value: unknown,
  prefix = ''
): string[] {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return prefix ? [prefix] : []
  }

  const entries = Object.entries(value as Record<string, unknown>)
  if (entries.length === 0) {
    return prefix ? [prefix] : []
  }

  return entries.flatMap(([key, nested]) =>
    collectLeafKeys(nested, prefix ? `${prefix}.${key}` : key)
  )
}

export function missingKeys(source: Set<string>, target: Set<string>) {
  return [...source].filter((key) => !target.has(key)).sort()
}
