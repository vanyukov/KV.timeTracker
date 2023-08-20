import { useParams } from "react-router-dom"
import { dateLib } from "common/dateTime"

export const useActiveDay = () => {
  const params = useParams()

  if (!params.day || !params.month || !params.year) {
    return dateLib().format("D M YYYY")
  }

  return `${params.day} ${params.month} ${params.year}`
}
