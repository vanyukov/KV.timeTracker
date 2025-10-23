import { Box } from "@mui/material";
import { isExtensionMode } from "api/chrome";
import { BtnLoginGoogle } from "feature/Auth";
import { LoginExtention } from "feature/Auth/LoginExtention";

export function Login() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={4} p={2}>
      <h1>Login</h1>
      {isExtensionMode() ? <LoginExtention /> : <BtnLoginGoogle />}
    </Box>
  );
}
