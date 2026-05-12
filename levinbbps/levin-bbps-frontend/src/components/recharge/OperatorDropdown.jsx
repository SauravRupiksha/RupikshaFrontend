import { mobileOperators } from "../../data/mobileOperators"

export default function OperatorDropdown({
  value,
  onChange,
}) {
  return (
    <div>
      <label className="block mb-2 font-medium">
        Select Operator
      </label>

      <select
        name="providerId"
        value={value}
        onChange={onChange}
        className="w-full border rounded-xl px-4 py-3 outline-none"
        required
      >
        <option value="">
          Choose Operator
        </option>

        {mobileOperators.map((operator) => (
          <option
            key={operator.providerId}
            value={operator.providerId}
          >
            {operator.providerName}
          </option>
        ))}
      </select>
    </div>
  )
}