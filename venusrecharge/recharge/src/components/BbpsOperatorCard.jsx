import { electricityOperators }
from "../utils/electricityOperators"

import { insuranceOperators }
from "../utils/insuranceOperators"

import { gasOperators }
from "../utils/gasOperators"

import { fastagOperators }
from "../utils/fastagOperators"

import { postpaidOperators }
from "../utils/postpaidOperators"

import { datacardOperators }
from "../utils/datacardOperators"

export default function BbpsOperatorCard({

    formData,
    handleChange,
    nextStep

}) {

    // =========================
    // DYNAMIC OPERATORS
    // =========================

    let operators =
        electricityOperators

    if(
        formData.serviceType ===
        "INSURANCE"
    ){

        operators =
            insuranceOperators
    }

    if(
        formData.serviceType ===
        "GAS"
    ){

        operators =
            gasOperators
    }

    if(
        formData.serviceType ===
        "FASTAG"
    ){

        operators =
            fastagOperators
    }

    if(
        formData.serviceType ===
        "POSTPAID"
    ){

        operators =
            postpaidOperators
    }

    if(
        formData.serviceType ===
        "DATACARD"
    ){

        operators =
            datacardOperators
    }

    return (

        <div className="
            bg-white
            p-8
            rounded-3xl
            shadow-xl
            w-full
            max-w-md
        ">

            <h1 className="
                text-3xl
                font-bold
                mb-8
                text-center
            ">

                Select Operator

            </h1>

            <select
                name="opcode"
                value={formData.opcode}
                onChange={handleChange}
                className="
                    w-full
                    border
                    border-gray-300
                    rounded-2xl
                    p-4
                "
            >

                <option value="">
                    Select Operator
                </option>

                {

                    operators.map(
                        (item) => (

                        <option
                            key={item.id}
                            value={item.code}
                        >

                            {item.name}

                        </option>
                    ))
                }

            </select>

            <button
                onClick={nextStep}
                className="
                    w-full
                    bg-black
                    text-white
                    p-4
                    rounded-2xl
                    mt-6
                "
            >

                Continue

            </button>

        </div>
    )
}