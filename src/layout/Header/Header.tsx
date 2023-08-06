import { Link } from "ui"
import style from "./Header.module.scss"

export function Header() {
  return (
    <div className="container">
      <header className="flex pt12 pb12">
        <Link to="/">
          <img src="/img/logo.png" className={style.logo} alt="kv logo" />
        </Link>
      </header>
    </div>
  )
}
