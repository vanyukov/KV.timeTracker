export function timeDiffSplitted(
  timeStart: number,
  timeEnd = 0,
  elapsedTime = 0,
) {
  const secondsDiff = Math.floor(
    ((timeEnd > timeStart ? timeEnd - timeStart : 0) + elapsedTime) / 1000,
  )
  const hours = Math.floor(secondsDiff / 3600)
  const minutes = Math.floor((secondsDiff - hours * 3600) / 60)
  const seconds = Math.floor(secondsDiff - hours * 3600 - minutes * 60)

  return {
    hours: `${hours}`,
    minutes: `${minutes}`.padStart(2, "0"),
    seconds: `${seconds}`.padStart(2, "0"),
  }
}
