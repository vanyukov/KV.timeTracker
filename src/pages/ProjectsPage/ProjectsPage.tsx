import { Projects } from "feature/Projects"
import { MainLayout } from "layout"
import { Button, Link } from "ui"

export function ProjectsPage() {
  return (
    <MainLayout>
      <div className="container">
        <h1>Projects</h1>
        <Link href="/projects/new">
          <Button color="success">Add project</Button>
        </Link>
        <Projects className="pt12" />
      </div>
    </MainLayout>
  )
}
