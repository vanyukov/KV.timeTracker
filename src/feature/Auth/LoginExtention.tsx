import { useEffect, useState } from "react";
import { useAppDispatch } from "store";
import { Button, TextField } from "ui";
import { LS } from "api/LS";
import { loginSuccess } from "./redux";

export function LoginExtention() {
  const [userEmail, setuserEmail] = useState<string | null>("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    const saveduserEmail = LS.get("userEmail", false);
    if (saveduserEmail) {
      dispatch(loginSuccess({ email: saveduserEmail }));
    }
  }, [dispatch]);

  return (
    <>
      <TextField
        value={userEmail}
        onChange={e => {
          setuserEmail(e.target.value);
        }}
        label="user email"
        name="email"
      />
      <Button
        disabled={!userEmail}
        onClick={() => {
          dispatch(loginSuccess({ email: userEmail }));
          LS.set("userEmail", userEmail);
        }}
      >
        set email
      </Button>
    </>
  );
}
