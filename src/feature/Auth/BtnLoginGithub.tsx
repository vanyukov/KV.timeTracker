import { useSignInWithGithub } from "react-firebase-hooks/auth"
import { getAuth } from "firebase/auth"
import { firebaseApp } from "api/firebase"
import { Button } from "ui"

const auth = getAuth(firebaseApp)

export function BtnLoginGithub() {
  const [signInWithGithub] = useSignInWithGithub(auth)
  return (
    <Button
      onClick={() => {
        void signInWithGithub()
      }}
    >
      Github
    </Button>
  )
}
