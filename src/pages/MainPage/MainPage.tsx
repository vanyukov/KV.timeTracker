import { MainLayout } from "layout"
import { Button } from "ui"
import { WeekNav } from "widget"

export function MainPage() {
  // TODO: if today have track show DayPage
  return (
    <MainLayout>
      <div className="container">
        <WeekNav />
        <h1>Main</h1>
        <Button className="pt12 pb12" color="success">Add Track</Button>
      </div>
    </MainLayout>
  )
}
