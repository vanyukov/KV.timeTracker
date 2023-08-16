import { MainLayout } from "layout"
import { WeekNav } from "widget"

export function MainPage() {
  // TODO: if today have track show DayPage
  return (
    <MainLayout>
      <div className="container">
        <WeekNav />
        <h1>Main</h1>
        <button type="button" className="pt12 pb12">
          Add Track
        </button>
      </div>
    </MainLayout>
  )
}
