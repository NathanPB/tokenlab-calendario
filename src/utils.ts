export function formatTimeString(millis: number): string {
  if (millis < 999) {
    return 'Now'
  }

  if (millis < 86400000) {
    return Math.floor(millis / 3600000) + ' hours'
  }

  if (millis < 604800000) {
    return Math.floor(millis / 3600000) + ' days'
  }

  return Math.floor(millis / 604800000) + ' weeks'
}
