import { useState } from "react"

import RechargeCard from "../components/RechargeCard"
import SuccessCard from "../components/SuccessCard"

import { generateTxnId } from "../utils/generateTxnId"

import { doRecharge } from "../services/rechargeService"

export default function RechargePage() {

    const [loading, setLoading] =
        useState(false)

    const [responseData, setResponseData] =
        useState(null)

    const [success, setSuccess] =
        useState(false)

    const [formData, setFormData] =
        useState({

            mobileNo: "",
            operatorCode: "",
            merchantRefNo: "",
            serviceType: "MR",
            amount: ""

        })

    const handleChange = (e) => {

        setFormData({

            ...formData,
            [e.target.name]: e.target.value

        })
    }

    const submitRecharge = async () => {

        try {

            if(!formData.mobileNo){

                alert("Enter Number")

                return
            }

            if(!formData.operatorCode){

                alert("Select Operator")

                return
            }

            if(!formData.amount){

                alert("Enter Amount")

                return
            }

            setLoading(true)

            // =========================
            // GENERATE UNIQUE TXN ID
            // =========================

            const payload = {

                ...formData,

                merchantRefNo:
                    generateTxnId(),

                amount:
                    Number(formData.amount)
            }

            console.log(
                "Recharge Payload :",
                payload
            )

            const response =
                await doRecharge(payload)

            console.log(response)

            if(response.success){

                setResponseData(response.data)

                setSuccess(true)

            } else {

                alert(
                    response.message
                    || "Recharge Failed"
                )
            }

        } catch (error) {

            console.log(error)

            alert("Recharge Failed")

        } finally {

            setLoading(false)
        }
    }

    return (

        <div className="
            min-h-screen
            bg-gradient-to-br
            from-gray-100
            to-gray-200
            flex
            items-center
            justify-center
            p-6
        ">

            {
                !success ? (

                    <RechargeCard
                        formData={formData}
                        handleChange={handleChange}
                        submitRecharge={submitRecharge}
                        loading={loading}
                    />

                ) : (

                    <SuccessCard
                        data={responseData}
                    />

                )
            }

        </div>
    )
}