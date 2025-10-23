import { type ReactElement } from "react";
import { Login } from "pages";
import { useAuthError, useAuthLoading, useAuthUser } from "feature/Auth";
import { CircularProgress } from "ui";

export function Protected({ children }: { children: ReactElement }) {
  const user = useAuthUser();
  const loading = useAuthLoading();
  const error = useAuthError();

  if (loading) {
    return (
      <div className="container pt12">
        <CircularProgress />
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="content">
        <p>
          Error:
          {error}
        </p>
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <Login />;
}
