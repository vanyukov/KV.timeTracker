import { useSignInWithGoogle } from "react-firebase-hooks/auth"
import { getAuth } from "firebase/auth"
import { firebaseApp } from "api/firebase"
import { Button } from "ui"

const auth = getAuth(firebaseApp)

export function BtnLoginGoogle() {
  const [signInWithGoogle] = useSignInWithGoogle(auth)
  return (
    <Button
      onClick={() => {
        void signInWithGoogle()
      }}
    >
      Google
    </Button>
  )
}
