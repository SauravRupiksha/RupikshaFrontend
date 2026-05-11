export default function BbpsServiceCard({

    formData,
    handleChange,
    nextStep

}) {

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

                Select Service

            </h1>

            <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="
                    w-full
                    border
                    border-gray-300
                    rounded-2xl
                    p-4
                "
            >

                <option value="UB">
                    Electricity Bill
                </option>

                <option value="INSURANCE">
                    Insurance Premium
                </option>

                <option value="GAS">
                    Gas Bill
                </option>

                <option value="FASTAG">
                    FASTag Recharge
                </option>

                <option value="POSTPAID">
                    Mobile Postpaid
                </option>

                <option value="DATACARD">
                    Data Card
                </option>

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