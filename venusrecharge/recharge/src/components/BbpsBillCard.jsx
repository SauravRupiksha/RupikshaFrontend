export default function BbpsBillCard({

    billData,
    payBill,
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

                Bill Details

            </h1>

            <div className="space-y-5">

                <div className="
                    border
                    rounded-2xl
                    p-4
                    bg-gray-50
                ">

                    <p className="text-gray-500">
                        Consumer Name
                    </p>

                    <h2 className="
                        text-xl
                        font-semibold
                    ">

                        {
                            billData.consumerName
                        }

                    </h2>

                </div>

                <div className="
                    border
                    rounded-2xl
                    p-4
                    bg-gray-50
                ">

                    <p className="text-gray-500">
                        Due Amount
                    </p>

                    <h2 className="
                        text-xl
                        font-semibold
                    ">

                        ₹
                        {
                            billData.dueAmount
                        }

                    </h2>

                </div>

                <div className="
                    border
                    rounded-2xl
                    p-4
                    bg-gray-50
                ">

                    <p className="text-gray-500">
                        Due Date
                    </p>

                    <h2 className="
                        text-lg
                        font-semibold
                    ">

                        {
                            billData.dueDate
                        }

                    </h2>

                </div>

                <button
                    onClick={payBill}
                    disabled={loading}
                    className={`
                        w-full
                        text-white
                        p-4
                        rounded-2xl
                        mt-4
                        ${
                            loading
                            ? "bg-gray-400"
                            : "bg-green-600"
                        }
                    `}
                >

                    {

                        loading

                        ? "Processing Payment..."

                        : "Pay Now"
                    }

                </button>

                {

                    billData.description && (

                        <div className="
                            mt-5
                            p-4
                            rounded-2xl
                            bg-gray-100
                            text-center
                            text-sm
                        ">

                            {
                                billData.description
                            }

                        </div>
                    )
                }

            </div>

        </div>
    )
}