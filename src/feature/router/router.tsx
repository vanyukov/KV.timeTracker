import { createBrowserRouter } from "react-router-dom"
import {
  ClientEditPage,
  ClientNewPage,
  ClientsPage,
  DayPage,
  TrackEditPage,
  NewTrackPage,
  NotFound,
  ReportsPage,
  TracksByPeriod,
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
    element: <NewTrackPage />,
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
    path: "*",
    element: <NotFound />,
  },
])
