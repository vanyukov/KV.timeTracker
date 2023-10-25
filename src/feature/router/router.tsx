import { createBrowserRouter } from "react-router-dom"
import {
  ClientsPage,
  DayPage,
  EditTrackPage,
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
    element: <EditTrackPage />,
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
    path: "/reports/TracksByPeriod",
    element: <TracksByPeriod />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
])
