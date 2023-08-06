import { createBrowserRouter } from "react-router-dom"
import { MainPage, NotFound } from "pages"

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
    path: "*",
    element: <NotFound />,
  },
])
