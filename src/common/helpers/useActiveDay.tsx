import { useParams } from "react-router-dom"
import dayjs from "dayjs"

export const useActiveDay = () => {
  const params = useParams()

  if (!params.day || !params.month || !params.year) {
    return dayjs().format("D M YYYY")
  }

  return `${params.day} ${params.month} ${params.year}`
}
