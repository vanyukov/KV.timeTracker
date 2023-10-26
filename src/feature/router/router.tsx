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
} from "pages"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DayPage />,
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
    path: "/reports/TracksByPeriod",
    element: <TracksByPeriod />,
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
