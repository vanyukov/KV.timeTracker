import { MainLayout } from "layout"
import { useLocation } from "react-router-dom"

export function NotFound() {
  const { pathname } = useLocation()
  return (
    <MainLayout>
      <div className="container">
        <h1>Page Not Found - 404</h1>
        <p>
          path:
          {pathname}
        </p>
      </div>
    </MainLayout>
  )
}
