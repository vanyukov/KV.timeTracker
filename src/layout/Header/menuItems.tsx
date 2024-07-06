import { BtnLogout } from "feature/Auth"
import { Link } from "ui"

export const menuItems = [
  { title: <Link href="/reports">Reports</Link>, id: 1 },
  { title: <Link href="/clients">Clients</Link>, id: 2 },
  { title: <Link href="/projects">Projects</Link>, id: 3 },
  { title: <BtnLogout />, id: 3 },
]
