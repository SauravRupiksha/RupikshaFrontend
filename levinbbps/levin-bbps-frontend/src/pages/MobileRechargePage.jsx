import MainLayout from "../layouts/MainLayout"
import RechargeForm from "../components/recharge/RechargeForm"

export default function MobileRechargePage() {

  return (

    <MainLayout>

      <div className="flex items-center justify-center mt-10">

        <RechargeForm />

      </div>

    </MainLayout>
  )
}