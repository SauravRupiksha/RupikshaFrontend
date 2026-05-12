import { useState } from "react"
import { rechargeApi } from "../../services/levinApi"
import Loader from "../common/Loader"
import ResponseCard from "../common/ResponseCard"
import DthOperatorDropdown from "./DthOperatorDropdown"

export default function DthForm() {

  const [form, setForm] = useState({
    number: "",
    providerId: "",
    amount: "",
    providerCode: "NA",
  })

  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState("")

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    setLoading(true)
    setError("")
    setResponse(null)

    try {

      const data = await rechargeApi(form)

      setResponse(data)

    } catch (err) {

      console.error(err)

      setError("DTH Recharge failed")

    } finally {

      setLoading(false)
    }
  }

  return (

    <div className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-md">

      <h2 className="text-3xl font-bold text-center mb-2">
        DTH Recharge
      </h2>

      <p className="text-center text-gray-500 mb-6">
        Fast & Secure DTH Recharge
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <div>
          <label className="block mb-2 font-medium">
            Subscriber ID
          </label>

          <input
            type="text"
            name="number"
            value={form.number}
            onChange={handleChange}
            placeholder="Enter subscriber ID"
            className="w-full border rounded-xl px-4 py-3 outline-none"
            required
          />
        </div>

        <DthOperatorDropdown
          value={form.providerId}
          onChange={handleChange}
        />

        <div>
          <label className="block mb-2 font-medium">
            Amount
          </label>

          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="w-full border rounded-xl px-4 py-3 outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-2xl font-semibold hover:opacity-90 transition"
        >
          {loading ? "Processing..." : "Recharge Now"}
        </button>

      </form>

      {loading && <Loader />}

      {error && (
        <div className="mt-4 bg-red-100 text-red-700 p-4 rounded-xl">
          {error}
        </div>
      )}

      <ResponseCard response={response} />

    </div>
  )
}