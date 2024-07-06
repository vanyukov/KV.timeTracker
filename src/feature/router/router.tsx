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
    element: <DayPage />,
  },
  {
    path: "/day/:year/:month/:day",
    element: <DayPage />,
  },
  {
    path: "/track/new",
    element: <TrackNewPage />,
  },
  {
    path: "/track/:id",
    element: <TrackEditPage />,
  },
  {
    path: "/reports",
    element: <ReportsPage />,
  },
  {
    path: "/reports/TracksByPeriod",
    element: <TracksByPeriod />,
  },
  {
    path: "/clients",
    element: <ClientsPage />,
  },
  {
    path: "/clients/new",
    element: <ClientNewPage />,
  },
  {
    path: "/clients/:id",
    element: <ClientEditPage />,
  },
  {
    path: "/clients",
    element: <ClientsPage />,
  },
  {
    path: "/projects/new",
    element: <ProjectNewPage />,
  },
  {
    path: "/projects/:id",
    element: <ProjectEditPage />,
  },
  {
    path: "/projects",
    element: <ProjectsPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
])
