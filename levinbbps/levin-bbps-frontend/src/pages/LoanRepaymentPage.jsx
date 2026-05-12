import MainLayout from "../layouts/MainLayout"

import LoanRepaymentForm from "../components/loan/LoanRepaymentForm"

export default function LoanRepaymentPage() {

  return (

    <MainLayout>

      <div className="flex items-center justify-center mt-10">

        <LoanRepaymentForm />

      </div>

    </MainLayout>
  )
}