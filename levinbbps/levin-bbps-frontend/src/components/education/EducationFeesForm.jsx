import { useMemo, useState } from "react"

import educationOperators from "../../data/educationOperators"

import EducationOperatorDropdown from "./EducationOperatorDropdown"

import Loader from "../common/Loader"

import ResponseCard from "../common/ResponseCard"

import {
  fetchBillApi,
  payBillApi,
} from "../../services/levinApi"

export default function EducationFeesForm() {

  const [step, setStep] = useState("FETCH")

  const [loading, setLoading] = useState(false)

  const [payLoading, setPayLoading] = useState(false)

  const [response, setResponse] = useState(null)

  const [billData, setBillData] = useState(null)

  const [error, setError] = useState("")

  const [form, setForm] = useState({
    number: "",
    providerId: "",
    retailerMobileNumber:
      localStorage.getItem("mobileNumber") || "",
  })

  // ===============================
  // SAFE SELECTED OPERATOR
  // ===============================

  const selectedOperator = useMemo(() => {

    if (!form.providerId) {
      return null
    }

    return (
      educationOperators.find(
        (item) =>
          String(item?.id) ===
          String(form.providerId)
      ) || null
    )

  }, [form.providerId])

  // ===============================
  // HANDLE CHANGE
  // ===============================

  const handleChange = (e) => {

    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // ===============================
  // FETCH FEES
  // ===============================

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
          form.retailerMobileNumber,
      }

      console.log(
        "FETCH PAYLOAD:",
        payload
      )

      const data =
        await fetchBillApi(payload)

      console.log(
        "FETCH RESPONSE:",
        data
      )

      setBillData(data)

      if (data?.statusId === "1") {

        setStep("PAY")

      } else {

        setError(
          data?.reason ||
          data?.message ||
          "Fee fetch failed"
        )
      }

    } catch (err) {

      console.error(
        "FETCH ERROR:",
        err
      )

      setError("Fee fetch failed")

    } finally {

      setLoading(false)
    }
  }

  // ===============================
  // PAY FEES
  // ===============================

  const handlePay = async () => {

    setPayLoading(true)

    setError("")

    try {

      const payload = {
        number: form.number,
        providerId: form.providerId,
        amount:
          Number(billData?.amount || 0),
        mobileNumber:
          form.retailerMobileNumber,
        billContext:
          billData?.billContext,
        field13: "NA",
        bbpsDueDate:
          billData?.dueDate,
      }

      console.log(
        "PAY PAYLOAD:",
        payload
      )

      const data =
        await payBillApi(payload)

      console.log(
        "PAY RESPONSE:",
        data
      )

      setResponse(data)

    } catch (err) {

      console.error(
        "PAY ERROR:",
        err
      )

      setError("Fee payment failed")

    } finally {

      setPayLoading(false)
    }
  }

  return (

    <div className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-md">

      <h2 className="text-3xl font-bold text-center mb-2">
        Education Fees
      </h2>

      <p className="text-center text-gray-500 mb-6">
        Fetch & Pay Education Fees
      </p>

      {
        step === "FETCH" && (

          <form
            onSubmit={handleFetch}
            className="space-y-4"
          >

            <EducationOperatorDropdown
              value={form.providerId}
              onChange={handleChange}
            />

            <div>

              <label className="block mb-2 font-medium">

                {
                  selectedOperator?.inputLabel ||
                  "Student ID"
                }

              </label>

              <input
                type="text"
                name="number"
                value={form.number}
                onChange={handleChange}
                placeholder={
                  selectedOperator?.inputLabel ||
                  "Enter Student ID"
                }
                className="w-full border rounded-xl px-4 py-3 outline-none"
                required
              />

            </div>

            <button
              type="submit"
              disabled={
                loading ||
                !form.providerId ||
                !form.number
              }
              className="w-full bg-black text-white py-3 rounded-2xl font-semibold hover:opacity-90 transition disabled:opacity-50"
            >

              {
                loading
                  ? "Fetching..."
                  : "Fetch Fees"
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
                  Student
                </span>

                <span>
                  {
                    billData?.customerName ||
                    "N/A"
                  }
                </span>

              </div>

              <div className="flex justify-between py-2">

                <span className="font-medium">
                  Fees Amount
                </span>

                <span>
                  ₹ {
                    billData?.amount ||
                    "0"
                  }
                </span>

              </div>

              <div className="flex justify-between py-2">

                <span className="font-medium">
                  Due Date
                </span>

                <span>
                  {
                    billData?.dueDate ||
                    "N/A"
                  }
                </span>

              </div>

            </div>

            <button
              onClick={handlePay}
              disabled={payLoading}
              className="w-full bg-black text-white py-3 rounded-2xl font-semibold hover:opacity-90 transition disabled:opacity-50"
            >

              {
                payLoading
                  ? "Processing..."
                  : "Pay Fees"
              }

            </button>

          </div>
        )
      }

      {loading && <Loader />}

      {payLoading && <Loader />}

      {
        error && (

          <div className="mt-4 bg-red-100 text-red-700 p-4 rounded-xl">
            {error}
          </div>

        )
      }

      <ResponseCard response={response} />

    </div>
  )
}