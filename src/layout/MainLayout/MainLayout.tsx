import { Header } from "layout"

type PropsType = {
  children: React.ReactNode
}

export function MainLayout({ children }: PropsType) {
  return (
    <>
      <Header />
      <main className="content">{children}</main>
    </>
  )
}
