import classNames from "classnames"
import { Button, Link } from "ui"
import style from "./Header.module.scss"

export function Header() {
  return (
    <div className="container">
      <header className={classNames("flex pt12 pb12", style.header)}>
        <Link href="/" className={style.logoLink}>
          <img
            src="/img/logo.png"
            className={style.logo}
            alt="kv logo"
            width={37}
          />
        </Link>
        <Button color="success">Add Track</Button>
      </header>
    </div>
  )
}
