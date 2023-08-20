import { Header } from "layout"
import style from "./MainLayout.module.scss"

type PropsType = {
  children: React.ReactNode
}

export function MainLayout({ children }: PropsType) {
  return (
    <div className={style.wrap}>
      <Header />
      <main className="content">{children}</main>
    </div>
  )
}
