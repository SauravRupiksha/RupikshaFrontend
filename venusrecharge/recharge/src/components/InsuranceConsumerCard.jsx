export default function InsuranceConsumerCard({

    formData,
    handleChange,
    fetchBill,
    loading

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

                Insurance Details

            </h1>

            <div className="space-y-5">

                {/* POLICY NUMBER */}

                <input
                    type="text"
                    name="consumerId"
                    value={formData.consumerId}
                    onChange={handleChange}
                    placeholder="Enter Policy Number"
                    className="
                        w-full
                        border
                        border-gray-300
                        rounded-2xl
                        p-4
                    "
                />

                {/* MOBILE NUMBER */}

                <input
                    type="text"
                    name="consumerMobileNo"
                    value={formData.consumerMobileNo}
                    onChange={handleChange}
                    placeholder="Enter Mobile Number"
                    className="
                        w-full
                        border
                        border-gray-300
                        rounded-2xl
                        p-4
                    "
                />

                {/* DOB */}

                <input
                    type="text"
                    name="subDiv"
                    value={formData.subDiv}
                    onChange={handleChange}
                    placeholder="Enter DOB (DDMMYYYY)"
                    className="
                        w-full
                        border
                        border-gray-300
                        rounded-2xl
                        p-4
                    "
                />

                {/* EMAIL */}

                <input
                    type="email"
                    name="field1"
                    value={formData.field1}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    className="
                        w-full
                        border
                        border-gray-300
                        rounded-2xl
                        p-4
                    "
                />

                <button
                    onClick={fetchBill}
                    className="
                        w-full
                        bg-black
                        text-white
                        p-4
                        rounded-2xl
                    "
                >

                    {
                        loading
                            ? "Fetching..."
                            : "Fetch Premium"
                    }

                </button>

            </div>

        </div>
    )
}