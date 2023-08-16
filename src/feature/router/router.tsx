import { createBrowserRouter } from "react-router-dom"
import { DayPage, MainPage, NotFound } from "pages"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/index.html",
    element: <MainPage />,
  },
  {
    path: "/day/:year/:month/:day",
    element: <DayPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
])
