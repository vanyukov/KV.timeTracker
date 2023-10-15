import { MainLayout } from "layout"
import { Link } from "ui"

export function ReportsPage() {
  const { pathname } = window?.location || "/reports"
  return (
    <MainLayout>
      <div className="container">
        <h1>Reports</h1>
        <Link href={`${pathname}/TracksByPeriod`}>TracksByPeriod</Link>
      </div>
    </MainLayout>
  )
}
