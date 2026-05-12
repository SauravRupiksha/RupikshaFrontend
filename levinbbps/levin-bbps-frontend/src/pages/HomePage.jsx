import { Link } from "react-router-dom"

import MainLayout from "../layouts/MainLayout"

export default function HomePage() {

  return (

    <MainLayout>

      <div className="max-w-7xl mx-auto mt-10 px-4">

        <h1 className="text-4xl font-bold text-center">
          Levin BBPS Dashboard
        </h1>

        <p className="text-center text-gray-500 mt-3">
          Recharge & Bill Payment Services
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-10">

          <Link to="/mobile-recharge">

            <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition cursor-pointer h-full">

              <h2 className="text-2xl font-bold">
                Mobile Recharge
              </h2>

              <p className="text-gray-500 mt-3">
                Recharge prepaid mobile instantly
              </p>

            </div>

          </Link>

          <Link to="/dth-recharge">

            <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition cursor-pointer h-full">

              <h2 className="text-2xl font-bold">
                DTH Recharge
              </h2>

              <p className="text-gray-500 mt-3">
                Recharge DTH connections securely
              </p>

            </div>

          </Link>

          <Link to="/electricity-bill">

            <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition cursor-pointer h-full">

              <h2 className="text-2xl font-bold">
                Electricity Bill
              </h2>

              <p className="text-gray-500 mt-3">
                Fetch & Pay Electricity Bills
              </p>

            </div>

          </Link>

          <Link to="/loan-repayment">

            <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition cursor-pointer h-full">

              <h2 className="text-2xl font-bold">
                Loan Repayment
              </h2>

              <p className="text-gray-500 mt-3">
                Pay Loan EMI Instantly
              </p>

            </div>

          </Link>

          <Link to="/education-fees">

            <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition cursor-pointer h-full">

              <h2 className="text-2xl font-bold">
                Education Fees
              </h2>

              <p className="text-gray-500 mt-3">
                Fetch & Pay School / College Fees
              </p>

            </div>

          </Link>

          {/* NEW BROADBAND CARD */}

          <Link to="/broadband">

            <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition cursor-pointer h-full">

              <h2 className="text-2xl font-bold">
                Broadband
              </h2>

              <p className="text-gray-500 mt-3">
                Fetch & Pay Broadband Bills
              </p>

            </div>

          </Link>

        </div>

      </div>

    </MainLayout>
  )
}