import { operators } from "../utils/operators"
import { dthOperators } from "../utils/dthOperators"

export default function OperatorSelect({

    value,
    onChange,
    serviceType

}) {

    const operatorList =
        serviceType === "DH"
            ? dthOperators
            : operators

    return (

        <select
            value={value}
            onChange={onChange}
            className="
                w-full
                border
                border-gray-300
                rounded-xl
                p-3
                outline-none
                focus:ring-2
                focus:ring-black
            "
        >

            <option value="">
                Select Operator
            </option>

            {
                operatorList.map((operator) => (

                    <option
                        key={operator.id}
                        value={operator.code}
                    >
                        {operator.name}
                    </option>

                ))
            }

        </select>
    )
}