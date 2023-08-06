import { MainLayout } from "layout"

export type MainPageProps = {
  className?: string
}

export const MainPage = ({ className }: MainPageProps) => {
  return (
    <MainLayout>
      <div className="container">
        <h1>Main</h1>
      </div>
    </MainLayout>
  )
}

MainPage.defaultProps = {
  className: "",
}
