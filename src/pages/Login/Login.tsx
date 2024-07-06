import { Box } from "@mui/material"
import { BtnLoginGoogle } from "feature/Auth"

export function Login() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={4} p={2}>
      <h1>Login</h1>
      <BtnLoginGoogle />
    </Box>
  )
}
