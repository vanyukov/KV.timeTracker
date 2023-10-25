import { Clients } from "feature/Clients"
import { MainLayout } from "layout"
import { Button, Link } from "ui"

export function ClientsPage() {
  return (
    <MainLayout>
      <div className="container">
        <h1>Clients</h1>
        <Link href="/clients/new">
          <Button color="success">Add client</Button>
        </Link>
        <Clients className="pt12" />
      </div>
    </MainLayout>
  )
}
