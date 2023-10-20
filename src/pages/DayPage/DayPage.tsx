import { useParams } from "react-router-dom"
import { MainLayout } from "layout"
import { WeekNav } from "widget"
import { Tracks } from "feature/Tracks"
import { type TdateLib, dateLib } from "common/dateTime"

export function DayPage() {
  const params = useParams()
  let dateStart: TdateLib
  if (!params.day || !params.month || !params.year) {
    dateStart = dateLib().startOf("day")
  } else {
    dateStart = dateLib(`${params.year}-${params.month}-${params.day}`)
  }

  const dateEnd = dateStart.endOf("day")

  return (
    <MainLayout>
      <div className="container">
        <WeekNav />
        <Tracks dateStart={dateStart} dateEnd={dateEnd} className="pt12" />
      </div>
    </MainLayout>
  )
}
