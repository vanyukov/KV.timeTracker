import { getAuth } from "firebase/auth"
import { useAuthState as useAuthStateFirebase } from "react-firebase-hooks/auth"
import { firebaseApp } from "api/firebase"

const auth = getAuth(firebaseApp)

export const useAuthState = () => {
  const [user, loading, error] = useAuthStateFirebase(auth)
  return { user, loading, error }
}
