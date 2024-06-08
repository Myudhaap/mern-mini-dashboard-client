import { Link } from "react-router-dom"
import { notFound } from "../../assets"

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
        <img src={notFound} alt="Not found" className="w-1/2 aspect-square"/>
        <Link className="bg-primary hover:bg-primary/90 transition-colors duration-150 p-2 rounded-sm text-white font-semibold" to={-1}>Back to previous page</Link>
    </div>
  )
}
