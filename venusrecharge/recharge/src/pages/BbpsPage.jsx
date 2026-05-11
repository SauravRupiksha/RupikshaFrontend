import { useState } from "react"

import {

    fetchBillApi,

    payBillApi

} from "../api/bbpsApi"

import BbpsServiceCard
from "../components/BbpsServiceCard"

import BbpsOperatorCard
from "../components/BbpsOperatorCard"

import BbpsConsumerCard
from "../components/BbpsConsumerCard"

import InsuranceConsumerCard
from "../components/InsuranceConsumerCard"

import GasConsumerCard
from "../components/GasConsumerCard"

import FastagConsumerCard
from "../components/FastagConsumerCard"

import PostpaidConsumerCard
from "../components/PostpaidConsumerCard"

import DataCardConsumerCard
from "../components/DataCardConsumerCard"

import BbpsBillCard
from "../components/BbpsBillCard"

export default function BbpsPage() {

    const [step, setStep] =
        useState(1)

    const [loading, setLoading] =
        useState(false)

    const [billData, setBillData] =
        useState(null)

    const [formData, setFormData] =
        useState({

            serviceType: "UB",

            opcode: "",

            consumerId: "",

            consumerMobileNo: "",

            subDiv: "",

            field1: "",

            field2: ""
        })

    // =========================
    // HANDLE CHANGE
    // =========================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value
        })
    }

    // =========================
    // NEXT STEP
    // =========================

    const nextStep = () => {

        setStep(step + 1)
    }

    // =========================
    // FETCH BILL
    // =========================

    const fetchBill = async () => {

        try {

            setLoading(true)

            const payload = {

                ...formData,

                serviceType:

                    formData.serviceType ===
                    "INSURANCE"

                    ? "INS"

                    : formData.serviceType ===
                      "GAS"

                    ? "GAS"

                    : formData.serviceType ===
                      "FASTAG"

                    ? "FASTAG"

                    : formData.serviceType ===
                      "POSTPAID"

                    ? "POSTPAID"

                    : formData.serviceType ===
                      "DATACARD"

                    ? "DATACARD"

                    : "UB"
            }

            const response =
                await fetchBillApi(
                    payload
                )

            setBillData(response)

            setStep(4)

        } catch (error) {

            console.log(error)

            alert(
                "Unable To Fetch Bill"
            )

        } finally {

            setLoading(false)
        }
    }

    // =========================
    // PAY BILL
    // =========================

    const payBill = async () => {

        try {

            setLoading(true)

            const payload = {

                ...formData,

                serviceType:

                    formData.serviceType ===
                    "INSURANCE"

                    ? "INS"

                    : formData.serviceType ===
                      "GAS"

                    ? "GAS"

                    : formData.serviceType ===
                      "FASTAG"

                    ? "FASTAG"

                    : formData.serviceType ===
                      "POSTPAID"

                    ? "POSTPAID"

                    : formData.serviceType ===
                      "DATACARD"

                    ? "DATACARD"

                    : "EB",

                amount:
                    billData.dueAmount,

                orderId:
                    billData.orderId
            }

            const response =
                await payBillApi(
                    payload
                )

            alert(
                response.description
            )

        } catch (error) {

            console.log(error)

            alert(
                "Payment Failed"
            )

        } finally {

            setLoading(false)
        }
    }

    // =========================
    // UI
    // =========================

    return (

        <div className="
            min-h-screen
            bg-gray-100
            flex
            items-center
            justify-center
            p-6
        ">

            {

                step === 1 && (

                    <BbpsServiceCard

                        formData={formData}

                        handleChange={handleChange}

                        nextStep={nextStep}
                    />
                )
            }

            {

                step === 2 && (

                    <BbpsOperatorCard

                        formData={formData}

                        handleChange={handleChange}

                        nextStep={nextStep}
                    />
                )
            }

            {

                step === 3 && (

                    formData.serviceType ===
                    "INSURANCE"

                    ? (

                        <InsuranceConsumerCard

                            formData={formData}

                            handleChange={handleChange}

                            fetchBill={fetchBill}

                            loading={loading}
                        />
                    )

                    : formData.serviceType ===
                      "GAS"

                    ? (

                        <GasConsumerCard

                            formData={formData}

                            handleChange={handleChange}

                            fetchBill={fetchBill}

                            loading={loading}
                        />
                    )

                    : formData.serviceType ===
                      "FASTAG"

                    ? (

                        <FastagConsumerCard

                            formData={formData}

                            handleChange={handleChange}

                            fetchBill={fetchBill}

                            loading={loading}
                        />
                    )

                    : formData.serviceType ===
                      "POSTPAID"

                    ? (

                        <PostpaidConsumerCard

                            formData={formData}

                            handleChange={handleChange}

                            fetchBill={fetchBill}

                            loading={loading}
                        />
                    )

                    : formData.serviceType ===
                      "DATACARD"

                    ? (

                        <DataCardConsumerCard

                            formData={formData}

                            handleChange={handleChange}

                            fetchBill={fetchBill}

                            loading={loading}
                        />
                    )

                    : (

                        <BbpsConsumerCard

                            formData={formData}

                            handleChange={handleChange}

                            fetchBill={fetchBill}

                            loading={loading}
                        />
                    )
                )
            }

            {

                step === 4 && (

                    <BbpsBillCard

                        billData={billData}

                        payBill={payBill}

                        loading={loading}
                    />
                )
            }

        </div>
    )
}