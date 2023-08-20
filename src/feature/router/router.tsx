import { createBrowserRouter } from "react-router-dom"
import { DayPage, NewTrackPage, NotFound } from "pages"

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
    path: "*",
    element: <NotFound />,
  },
])
