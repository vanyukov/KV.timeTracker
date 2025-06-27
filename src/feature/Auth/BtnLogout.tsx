import { getAuth, signOut } from "firebase/auth";
import { firebaseApp } from "api/firebase";
import { Button } from "ui";
import { useAppDispatch } from "store";
import { isExtensionMode } from "api/chrome";
import { LS } from "api/LS";
import { logout } from "./redux";

const auth = getAuth(firebaseApp);

export function BtnLogout() {
  const dispatch = useAppDispatch();

  return (
    <Button
      variant="text"
      onClick={() => {
        dispatch(logout());
        if (!isExtensionMode()) {
          void signOut(auth);
        }
        LS.remove("userEmail");
      }}
    >
      Logout
    </Button>
  );
}
