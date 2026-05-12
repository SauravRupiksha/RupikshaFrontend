import loanOperators from "../../data/loanOperators"

export default function LoanOperatorDropdown({
  value,
  onChange,
}) {

  return (

    <div>

      <label className="block mb-2 font-medium">
        Loan Operator
      </label>

      <select
        name="providerId"
        value={value}
        onChange={onChange}
        className="w-full border rounded-xl px-4 py-3 outline-none"
        required
      >

        <option value="">
          Select Loan Operator
        </option>

        {
          loanOperators.map((operator) => (

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