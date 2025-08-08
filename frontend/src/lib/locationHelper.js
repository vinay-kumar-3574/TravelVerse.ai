export const coordsToString = (loc) => {
  if (!loc) return ''
  const { latitude, longitude } = loc
  return `${latitude?.toFixed(4)}, ${longitude?.toFixed(4)}`
}