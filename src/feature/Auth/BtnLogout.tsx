import { getAuth, signOut } from "firebase/auth"
import { firebaseApp } from "api/firebase"
import { Button } from "ui"

const auth = getAuth(firebaseApp)

export function BtnLogout() {
  return (
    <Button
      variant="text"
      onClick={() => {
        void signOut(auth)
      }}
    >
      Logout
    </Button>
  )
}
