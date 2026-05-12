import electricityOperators from "../../data/electricityOperators"

export default function ElectricityOperatorDropdown({
  value,
  onChange,
}) {

  return (

    <div>

      <label className="block mb-2 font-medium">
        Electricity Operator
      </label>

      <select
        name="providerId"
        value={value}
        onChange={onChange}
        className="w-full border rounded-xl px-4 py-3 outline-none"
        required
      >

        <option value="">
          Select Electricity Operator
        </option>

        {electricityOperators.map((operator) => (

          <option
            key={operator.id}
            value={operator.id}
          >
            {operator.name}
          </option>

        ))}

      </select>

    </div>
  )
}