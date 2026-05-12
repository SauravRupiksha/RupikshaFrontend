

import broadbandOperators from "../../data/broadbandOperators"

export default function BroadbandOperatorDropdown({
  value,
  onChange,
}) {

  return (

    <div>

      <label className="block mb-2 font-medium">
        Select Broadband Operator
      </label>

      <select
        name="providerId"
        value={value}
        onChange={onChange}
        className="w-full border rounded-xl px-4 py-3 outline-none bg-white"
        required
      >

        <option value="">
          Select Operator
        </option>

        {
          broadbandOperators.map(
            (item, index) => (

              <option
                key={`${item.id}-${index}`}
                value={item.id}
              >
                {item.name}
              </option>

            )
          )
        }

      </select>

    </div>
  )
}