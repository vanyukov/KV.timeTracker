import { Link, MenuComponent } from "ui"
import { BtnAddTrack } from "feature/Tracks"
import style from "./Header.module.scss"

const menuItems = [{ title: <Link href="/reports">Reports</Link>, id: 1 }]

export function Header() {
  return (
    <div className="container">
      <header className="pt12 pb12">
        <div className="flex align-center g8">
          <Link href="/" className={style.logoLink}>
            <img
              src="/img/logo.png"
              className={style.logo}
              alt="kv logo"
              width={37}
            />
          </Link>
          <BtnAddTrack />
          <MenuComponent
            title="Menu"
            items={menuItems}
            className={style.menu}
          />
        </div>
      </header>
    </div>
  )
}
