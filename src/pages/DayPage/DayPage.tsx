import { useParams } from "react-router-dom"
import { MainLayout } from "layout"
import { WeekNav } from "widget"

export function DayPage() {
  const params = useParams()

  return (
    <MainLayout>
      <div className="container">
        <WeekNav />
        <h1>DayPage Page</h1>
        <p>
          year:
          {' '}
          {params.year}
        </p>
        <p>
          month:
          {' '}
          {params.month}
        </p>
        <p>
          day:
          {' '}
          {params.day}
        </p>
      </div>
    </MainLayout>
  )
}
