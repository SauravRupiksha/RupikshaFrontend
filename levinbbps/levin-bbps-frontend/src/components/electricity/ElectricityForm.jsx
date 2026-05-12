import { useMemo, useState } from "react"

import electricityOperators from "../../data/electricityOperators"

import uppclDistricts from "../../data/uppclDistricts"

import ElectricityOperatorDropdown from "./ElectricityOperatorDropdown"

import Loader from "../common/Loader"

import ResponseCard from "../common/ResponseCard"

import {
  fetchBillApi,
  payBillApi,
} from "../../services/levinApi"

export default function ElectricityForm() {

  const [step, setStep] = useState("FETCH")

  const [form, setForm] = useState({
    number: "",
    providerId: "",
    retailerMobileNumber: "9102102871",
    districtDiscome: "",
  })

  const [billData, setBillData] = useState(null)

  const [loading, setLoading] = useState(false)

  const [payLoading, setPayLoading] = useState(false)

  const [response, setResponse] = useState(null)

  const [error, setError] = useState("")

  const selectedOperator = useMemo(() => {

    return electricityOperators.find(
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
  // FETCH BILL
  // =====================================================

  const handleFetchBill = async (e) => {

    e.preventDefault()

    setLoading(true)

    setError("")

    setResponse(null)

    try {

      const data = await fetchBillApi(form)

      setBillData(data)

      if (data?.statusId === "1") {

        setStep("PAY")

      } else {

        setError(
          data?.reason ||
          data?.message ||
          "Bill fetch failed"
        )
      }

    } catch (err) {

      console.error(err)

      setError("Bill fetch failed")

    } finally {

      setLoading(false)
    }
  }

  // =====================================================
  // PAY BILL
  // =====================================================

  const handlePayBill = async () => {

    setPayLoading(true)

    setError("")

    try {

      const payload = {

        number: form.number,

        providerId: form.providerId,

        amount: billData?.amount,

        mobileNumber:
          form.retailerMobileNumber,

        billContext:
          billData?.billContext,
      }

      const data =
        await payBillApi(payload)

      setResponse(data)

    } catch (err) {

      console.error(err)

      setError("Bill payment failed")

    } finally {

      setPayLoading(false)
    }
  }

  return (

    <div className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-md">

      <h2 className="text-3xl font-bold text-center mb-2">
        Electricity Bill
      </h2>

      <p className="text-center text-gray-500 mb-6">
        Fetch & Pay Electricity Bill
      </p>

      {

        step === "FETCH" && (

          <form
            onSubmit={handleFetchBill}
            className="space-y-4"
          >

            <ElectricityOperatorDropdown
              value={form.providerId}
              onChange={handleChange}
            />

            <div>

              <label className="block mb-2 font-medium">

                {
                  selectedOperator?.inputLabel ||
                  "Consumer Number"
                }

              </label>

              <input
                type="text"
                name="number"
                value={form.number}
                onChange={handleChange}
                placeholder={
                  selectedOperator?.inputLabel ||
                  "Enter consumer number"
                }
                className="w-full border rounded-xl px-4 py-3 outline-none"
                required
              />

            </div>

            {
              (
                form.providerId === "147" ||
                form.providerId === "138"
              ) && (

                <div>

                  <label className="block mb-2 font-medium">
                    Select District
                  </label>

                  <select
                    name="districtDiscome"
                    value={form.districtDiscome}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3 outline-none"
                    required
                  >

                    <option value="">
                      Select District
                    </option>

                    {
                      uppclDistricts.map((district) => (

                        <option
                          key={district.id}
                          value={district.id}
                        >
                          {district.name}
                        </option>

                      ))
                    }

                  </select>

                </div>
              )
            }

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-2xl font-semibold hover:opacity-90 transition"
            >

              {
                loading
                  ? "Fetching..."
                  : "Fetch Bill"
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
                  Amount
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
              onClick={handlePayBill}
              disabled={payLoading}
              className="w-full bg-black text-white py-3 rounded-2xl font-semibold hover:opacity-90 transition"
            >

              {
                payLoading
                  ? "Processing Payment..."
                  : "Pay Bill"
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