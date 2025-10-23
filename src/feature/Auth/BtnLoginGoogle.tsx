import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "api/firebase";
import { Button } from "ui";
import { useAppDispatch } from "store";
import { loginFailure, loginStart, loginSuccess } from "./redux";

const auth = getAuth(firebaseApp);

export function BtnLoginGoogle() {
  const dispatch = useAppDispatch();

  const [signInWithGoogle] = useSignInWithGoogle(auth);

  return (
    <Button
      onClick={() => {
        dispatch(loginStart());
        void signInWithGoogle()
          .then(result => {
            if (result?.user?.email) {
              dispatch(loginSuccess({ email: result.user.email }));
            } else {
              dispatch(loginFailure("Google sign-in failed: No user information."));
            }
          })
          .catch(error => {
            dispatch(loginFailure(error.message));
          });
      }}
    >
      Google
    </Button>
  );
}
