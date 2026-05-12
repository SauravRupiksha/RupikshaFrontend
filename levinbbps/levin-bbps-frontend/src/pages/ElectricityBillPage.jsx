import MainLayout from "../layouts/MainLayout"

import ElectricityForm from "../components/electricity/ElectricityForm"

export default function ElectricityBillPage() {

  return (

    <MainLayout>

      <div className="flex items-center justify-center mt-10">

        <ElectricityForm />

      </div>

    </MainLayout>
  )
}