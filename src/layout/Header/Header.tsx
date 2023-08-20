import { useParams } from "react-router-dom"
import { dateLib } from "common/dateTime"
import { Link, Typography } from "ui"
import { BtnAddTrack } from "feature/Tracks"
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
      <header className="flex align-center g8 pt12 pb12">
        <Link href="/" className={style.logoLink}>
          <img
            src="/img/logo.png"
            className={style.logo}
            alt="kv logo"
            width={37}
          />
        </Link>
        <BtnAddTrack />
        <Typography variant="h5" component="p">
          {dateLib(day).format("DD MMMM YYYY, dddd")}
        </Typography>
      </header>
    </div>
  )
}
