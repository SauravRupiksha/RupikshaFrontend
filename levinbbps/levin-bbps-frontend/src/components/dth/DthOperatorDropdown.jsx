import { dthOperators } from "../../data/dthOperators"

export default function DthOperatorDropdown({
  value,
  onChange,
}) {
  return (

    <div>
      <label className="block mb-2 font-medium">
        Select DTH Operator
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

        {dthOperators.map((operator) => (

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