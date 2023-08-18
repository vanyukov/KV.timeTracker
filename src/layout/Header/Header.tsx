import dayjs from "dayjs"
import { Button, Link, Typography } from "ui"
import style from "./Header.module.scss"

export function Header() {
  return (
    <div className="container">
      <header className="flex g8 pt12 pb12">
        <Link href="/" className={style.logoLink}>
          <img
            src="/img/logo.png"
            className={style.logo}
            alt="kv logo"
            width={37}
          />
        </Link>
        <Button color="success">Add Track</Button>
        <Typography variant="h5" component="p">
          {dayjs().format("DD MMMM YYYY, dddd")}
        </Typography>
      </header>
    </div>
  )
}
