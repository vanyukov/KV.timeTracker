export function timeDiffSplitted(
  timeStart: number,
  timeEnd = 0,
  elapsedTime = 0,
) {
  const secondsDiff = Math.floor(
    ((timeEnd > timeStart ? timeEnd - timeStart : 0) + elapsedTime) / 1000,
  )
  const timeSplit = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  }
  timeSplit.hours = Math.floor(secondsDiff / 3600)
  timeSplit.minutes = Math.floor((secondsDiff - timeSplit.hours * 3600) / 60)
  timeSplit.seconds = Math.floor(
    secondsDiff - timeSplit.hours * 3600 - timeSplit.minutes * 60,
  )

  timeSplit.minutes = +(`${timeSplit.minutes}`).padStart(2, "0")
  timeSplit.seconds = +(`${timeSplit.seconds}`).padStart(2, "0")

  return timeSplit
}
