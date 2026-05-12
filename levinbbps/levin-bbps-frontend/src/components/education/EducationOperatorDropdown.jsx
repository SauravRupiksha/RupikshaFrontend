import educationOperators from "../../data/educationOperators"

export default function EducationOperatorDropdown({
  value,
  onChange,
}) {

  return (

    <div>

      <label className="block mb-2 font-medium">
        Education Institute
      </label>

      <select
        name="providerId"
        value={value}
        onChange={onChange}
        className="w-full border rounded-xl px-4 py-3 outline-none"
        required
      >

        <option value="">
          Select Institute
        </option>

        {

          educationOperators.map((operator) => (

            <option
              key={operator.id}
              value={operator.id}
            >
              {operator.name}
            </option>

          ))
        }

      </select>

    </div>
  )
}