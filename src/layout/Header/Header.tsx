import { useParams } from "react-router-dom"
import dayjs from "dayjs"
import { Button, Link, Typography } from "ui"
import style from "./Header.module.scss"

export function Header() {
  const params = useParams()
  const day = (params.year
      && params.month
      && params.day
      && `${params.year}-${+params.month}-${params.day}`)
    ?? undefined

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
          {dayjs(day).format("DD MMMM YYYY, dddd")}
        </Typography>
      </header>
    </div>
  )
}
