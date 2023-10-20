import { useState } from "react"
import { MainLayout } from "layout"
import { DatePicker } from "ui"
import { type TdateLib, dateLib } from "common/dateTime"
import { Tracks } from "feature/Tracks"

export function TracksByPeriod() {
  const [period, setPeriod] = useState({
    start: dateLib().startOf("month"),
    end: dateLib().endOf("month"),
  })

  return (
    <MainLayout>
      <div className="container">
        <h1>TracksByPeriod</h1>
        <div className="flex g12 pb12">
          <DatePicker
            value={period.start}
            onChange={(newValue: TdateLib | null) => {
              if (!newValue) {
                return
              }
              setPeriod({
                ...period,
                start: newValue,
              })
            }}
            label="Start"
          />
          <DatePicker
            value={period.end}
            onChange={(newValue: TdateLib | null) => {
              if (!newValue) {
                return
              }
              setPeriod({
                ...period,
                end: newValue,
              })
            }}
            label="End"
          />
        </div>
        <Tracks dateStart={period.start} dateEnd={period.end} showDate />
      </div>
    </MainLayout>
  )
}
