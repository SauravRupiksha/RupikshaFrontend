import { useMemo, useState } from "react"

import loanOperators from "../../data/loanOperators"

import LoanOperatorDropdown from "./LoanOperatorDropdown"

import Loader from "../common/Loader"

import ResponseCard from "../common/ResponseCard"

import {
  fetchBillApi,
  rechargeApi,
} from "../../services/levinApi"

export default function LoanRepaymentForm() {

  const [step, setStep] = useState("FETCH")

  const [loading, setLoading] = useState(false)

  const [payLoading, setPayLoading] = useState(false)

  const [response, setResponse] = useState(null)

  const [billData, setBillData] = useState(null)

  const [error, setError] = useState("")

  const [form, setForm] = useState({

    number: "",

    providerId: "",

    mobileNumber:
      localStorage.getItem("mobileNumber") || "",
  })

  const selectedOperator = useMemo(() => {

    return loanOperators.find(
      (item) => item.id === form.providerId
    )

  }, [form.providerId])

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  // =====================================================
  // FETCH LOAN DETAILS
  // =====================================================

  const handleFetch = async (e) => {

    e.preventDefault()

    setLoading(true)

    setError("")

    setResponse(null)

    try {

      const payload = {

        number: form.number,

        providerId: form.providerId,

        retailerMobileNumber:
          form.mobileNumber,
      }

      const data =
        await fetchBillApi(payload)

      setBillData(data)

      if (data?.statusId === "1") {

        setStep("PAY")

      } else {

        setError(
          data?.reason ||
          data?.message ||
          "Loan fetch failed"
        )
      }

    } catch (err) {

      console.error(err)

      setError(
        "Loan fetch failed"
      )

    } finally {

      setLoading(false)
    }
  }

  // =====================================================
  // PAY EMI
  // =====================================================

  const handlePay = async () => {

    setPayLoading(true)

    setError("")

    try {

      const payload = {

        number: form.number,

        providerId: form.providerId,

        amount:
          Number(billData?.amount),

        mobileNumber:
          form.mobileNumber,

        field12: "NA",

        bbpsDueDate:
          billData?.dueDate,
      }

      const data =
        await rechargeApi(payload)

      setResponse(data)

    } catch (err) {

      console.error(err)

      setError(
        "Loan repayment failed"
      )

    } finally {

      setPayLoading(false)
    }
  }

  return (

    <div className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-md">

      <h2 className="text-3xl font-bold text-center mb-2">
        Loan Repayment
      </h2>

      <p className="text-center text-gray-500 mb-6">
        Fetch & Pay Loan EMI
      </p>

      {

        step === "FETCH" && (

          <form
            onSubmit={handleFetch}
            className="space-y-4"
          >

            <LoanOperatorDropdown
              value={form.providerId}
              onChange={handleChange}
            />

            <div>

              <label className="block mb-2 font-medium">

                {
                  selectedOperator?.inputLabel ||
                  "Loan Number"
                }

              </label>

              <input
                type="text"
                name="number"
                value={form.number}
                onChange={handleChange}
                placeholder={
                  selectedOperator?.inputLabel ||
                  "Enter loan number"
                }
                className="w-full border rounded-xl px-4 py-3 outline-none"
                required
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-2xl font-semibold hover:opacity-90 transition"
            >

              {
                loading
                  ? "Fetching..."
                  : "Fetch Loan Details"
              }

            </button>

          </form>
        )
      }

      {

        step === "PAY" &&
        billData && (

          <div className="space-y-4">

            <div className="bg-gray-100 rounded-2xl p-4">

              <div className="flex justify-between py-2">

                <span className="font-medium">
                  Customer
                </span>

                <span>
                  {billData.customerName}
                </span>

              </div>

              <div className="flex justify-between py-2">

                <span className="font-medium">
                  EMI Amount
                </span>

                <span>
                  ₹ {billData.amount}
                </span>

              </div>

              <div className="flex justify-between py-2">

                <span className="font-medium">
                  Due Date
                </span>

                <span>
                  {billData.dueDate}
                </span>

              </div>

            </div>

            <button
              onClick={handlePay}
              disabled={payLoading}
              className="w-full bg-black text-white py-3 rounded-2xl font-semibold hover:opacity-90 transition"
            >

              {
                payLoading
                  ? "Processing EMI..."
                  : "Pay EMI"
              }

            </button>

          </div>
        )
      }

      {loading && <Loader />}

      {payLoading && <Loader />}

      {error && (

        <div className="mt-4 bg-red-100 text-red-700 p-4 rounded-xl">
          {error}
        </div>

      )}

      <ResponseCard response={response} />

    </div>
  )
}