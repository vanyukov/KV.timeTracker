import { MainLayout } from "layout"
import { Link } from "ui"

export function ReportsPage() {
  return (
    <MainLayout>
      <div className="container">
        <h1>Reports</h1>
        <Link href="/reports/TracksByPeriod">TracksByPeriod</Link>
      </div>
    </MainLayout>
  )
}
