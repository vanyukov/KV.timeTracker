import { type ReactElement } from "react"
import { Login } from "pages"
import { useAuthState } from "feature/Auth"
import { CircularProgress } from "ui"

export function Protected({ children }: { children: ReactElement }) {
  const { user, loading, error } = useAuthState()

  if (loading) {
    return (
      <div className="container pt12">
        <CircularProgress />
        <p>Initialising User...</p>
      </div>
    )
  }
  if (error) {
    return (
      <div className="content">
        <p>
          Error:
          {error.name}
          {error.message}
        </p>
      </div>
    )
  }
  if (user) {
    return children
  }
  return <Login />
}
