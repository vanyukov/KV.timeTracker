import { useEffect, useState } from "react"
import { timeDiffSplitted, getTrackElapsedTime } from "common/dateTime"
import { TableCell, TableRow } from "ui"
import { type TTrack } from "../types"

function getTotalTime(list: TTrack[]) {
  return list.reduce(
    (acc, track) => acc + getTrackElapsedTime(track).valueOf(),
    0,
  )
}

export function TracksTotal({ list }: { list: TTrack[] }) {
  const [totalTimeView, setTotalTimeView] = useState(
    timeDiffSplitted(0, 0, getTotalTime(list)),
  )

  useEffect(() => {
    setTotalTimeView(timeDiffSplitted(0, 0, getTotalTime(list)))

    if (list.some(item => item.active)) {
      const interval = setInterval(() => {
        setTotalTimeView(timeDiffSplitted(0, 0, getTotalTime(list)))
      }, 1000)
      return () => {
        clearInterval(interval)
      }
    }
    return () => {}
  }, [list])

  return (
    <TableRow>
      <TableCell colSpan={1} size="medium" sx={{ fontWeight: "bold" }}>
        Total
      </TableCell>
      <TableCell>{`${totalTimeView.hours}:${totalTimeView.minutes}`}</TableCell>
      <TableCell />
    </TableRow>
  )
}
