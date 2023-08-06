import { RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"
import { ThemeWrapper } from "common/theme"
import { router } from "feature/router"
import { store } from "store"

function App() {
  return (
    <ThemeWrapper>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeWrapper>
  )
}

export default App
