import { useState } from "react";
import { Button, TextField } from "ui";
import { useAuthState } from "./useAuthState";

export function LoginExtention() {
  const [userEmail, setuserEmail] = useState<string | null>(null);
  const { setlocalUser } = useAuthState();

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
        disabled={!!userEmail}
        onClick={() => {
          if (setlocalUser && userEmail !== null) {
            setlocalUser({ email: userEmail });
          }
        }}
      >
        set email
      </Button>
    </>
  );
}
