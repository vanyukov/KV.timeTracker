import { getAuth } from "firebase/auth";
import { useAuthState as useAuthStateFirebase } from "react-firebase-hooks/auth";
import { firebaseApp } from "api/firebase";
import { isExtensionMode } from "api/chrome";
import { useState } from "react";

const auth = getAuth(firebaseApp);

export const useAuthState = () => {
  const [localUser, setlocalUser] = useState({email: ''});
  const [user, loading, error] = useAuthStateFirebase(auth);
  if (!isExtensionMode()) {
    return { user, loading, error };
  }
  return { user: localUser, loading: false, error: false, setlocalUser };
};
