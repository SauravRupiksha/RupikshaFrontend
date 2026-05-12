import { Link } from "react-router-dom"

export default function Navbar() {

  return (

    <div className="bg-black text-white px-6 py-4 flex items-center justify-between shadow-lg">

      <Link to="/">

        <h1 className="text-2xl font-bold cursor-pointer">
          Levin BBPS
        </h1>

      </Link>

      <div className="flex items-center gap-6">

        <Link
          to="/"
          className="hover:text-gray-300 transition"
        >
          Home
        </Link>

      </div>

    </div>
  )
}