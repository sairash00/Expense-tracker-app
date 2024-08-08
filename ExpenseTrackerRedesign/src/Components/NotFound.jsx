import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="w-full h-[90vh] flex flex-col gap-5 items-center justify-center " >
        <h1 className="text-4xl max-k:text-3xl max-md:text-2xl max-xs:text-xl font-bold text-gray-200">404 - Page Not Found</h1>
        <Link to="/dashboard" className="text-2xl px-2 py-1 border rounded-md border-gray-500 ">Back to Home</Link>
    </div>
  )
}

export default NotFound