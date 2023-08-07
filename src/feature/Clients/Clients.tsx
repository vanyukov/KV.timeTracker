import classNames from "classnames"
import style from "./Clients.module.scss"

export type ClientsProps = {
  className?: string
}

export function Clients({ className }: ClientsProps) {
  return (
    <div className={classNames(className, style.wrap)}>
      Clients
    </div>
  )
}

Clients.defaultProps = {
  className: "",
}
