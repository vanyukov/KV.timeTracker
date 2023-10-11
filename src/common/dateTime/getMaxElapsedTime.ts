export const time2359 = 86340000

export function getMaxElapsedTime(timeActive: number) {
  return Math.min(timeActive, time2359)
}
