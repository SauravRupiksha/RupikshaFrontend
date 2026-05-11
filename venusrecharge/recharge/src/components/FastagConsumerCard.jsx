export default function FastagConsumerCard({

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

                FASTag Details

            </h1>

            <div className="space-y-5">

                <input
                    type="text"
                    name="consumerId"
                    value={formData.consumerId}
                    onChange={handleChange}
                    placeholder="Enter Vehicle Number"
                    className="
                        w-full
                        border
                        border-gray-300
                        rounded-2xl
                        p-4
                    "
                />

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
                            : "Fetch FASTag"
                    }

                </button>

            </div>

        </div>
    )
}