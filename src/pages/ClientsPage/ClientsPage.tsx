import { Clients } from "feature/Clients"
import { MainLayout } from "layout"

export function ClientsPage() {
  return (
    <MainLayout>
      <div className="container">
        <h1>Clients</h1>
        <Clients />
      </div>
    </MainLayout>
  )
}
