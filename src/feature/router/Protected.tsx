import { type ReactElement } from "react"
import { Login } from "pages"
import { useAuthState } from "feature/Auth"

export function Protected({ children }: { children: ReactElement }) {
  const { user, loading, error } = useAuthState()

  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    )
  }
  if (error) {
    return (
      <div>
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
