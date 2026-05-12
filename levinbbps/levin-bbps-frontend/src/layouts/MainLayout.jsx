import Navbar from "../components/common/Navbar"

export default function MainLayout({ children }) {

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="p-4">

        {children}

      </div>

    </div>
  )
}