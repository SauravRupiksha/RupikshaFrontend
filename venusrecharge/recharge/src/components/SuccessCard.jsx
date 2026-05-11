export default function SuccessCard({ data }) {

    return (

        <div className="bg-white p-6 rounded-3xl shadow-xl w-full max-w-md text-center">

            <h1 className="text-3xl font-bold text-green-600 mb-4">
                Recharge Successful
            </h1>

            <div className="space-y-3 text-left">

                <p>
                    <strong>Mobile:</strong>
                    {" "}
                    {data.mobileNo}
                </p>

                <p>
                    <strong>Amount:</strong>
                    {" "}
                    ₹{data.amount}
                </p>

                <p>
                    <strong>Status:</strong>
                    {" "}
                    {data.responseStatus}
                </p>

                <p>
                    <strong>Operator Txn ID:</strong>
                    {" "}
                    {data.operatorTxnId}
                </p>

                <p>
                    <strong>Order No:</strong>
                    {" "}
                    {data.orderNo}
                </p>

            </div>
        </div>
    )
}