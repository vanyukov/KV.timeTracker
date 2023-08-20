import { MainLayout } from "layout"
import { WeekNav } from "widget"
import { Tracks } from "feature/Tracks"

export function DayPage() {
  return (
    <MainLayout>
      <div className="container">
        <WeekNav />
        <Tracks className="pt12" />
      </div>
    </MainLayout>
  )
}
