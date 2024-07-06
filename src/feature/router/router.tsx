import { createBrowserRouter } from "react-router-dom"
import {
  ClientEditPage,
  ClientNewPage,
  ClientsPage,
  DayPage,
  TrackEditPage,
  TrackNewPage,
  NotFound,
  ReportsPage,
  TracksByPeriod,
  ProjectsPage,
  ProjectNewPage,
  ProjectEditPage,
} from "pages"
import { Protected } from "./Protected"

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <DayPage />
      </Protected>
    ),
  },
  {
    path: "/index.html",
    element: (
      <Protected>
        <DayPage />
      </Protected>
    ),
  },
  {
    path: "/day/:year/:month/:day",
    element: (
      <Protected>
        <DayPage />
      </Protected>
    ),
  },
  {
    path: "/track/new",
    element: (
      <Protected>
        <TrackNewPage />
      </Protected>
    ),
  },
  {
    path: "/track/:id",
    element: (
      <Protected>
        <TrackEditPage />
      </Protected>
    ),
  },
  {
    path: "/reports",
    element: (
      <Protected>
        <ReportsPage />
      </Protected>
    ),
  },
  {
    path: "/reports/TracksByPeriod",
    element: (
      <Protected>
        <TracksByPeriod />
      </Protected>
    ),
  },
  {
    path: "/clients",
    element: (
      <Protected>
        <ClientsPage />
      </Protected>
    ),
  },
  {
    path: "/clients/new",
    element: (
      <Protected>
        <ClientNewPage />
      </Protected>
    ),
  },
  {
    path: "/clients/:id",
    element: (
      <Protected>
        <ClientEditPage />
      </Protected>
    ),
  },
  {
    path: "/clients",
    element: (
      <Protected>
        <ClientsPage />
      </Protected>
    ),
  },
  {
    path: "/projects/new",
    element: (
      <Protected>
        <ProjectNewPage />
      </Protected>
    ),
  },
  {
    path: "/projects/:id",
    element: (
      <Protected>
        <ProjectEditPage />
      </Protected>
    ),
  },
  {
    path: "/projects",
    element: (
      <Protected>
        <ProjectsPage />
      </Protected>
    ),
  },
  {
    path: "*",
    element: (
      <Protected>
        <NotFound />
      </Protected>
    ),
  },
])
