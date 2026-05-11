import OperatorSelect from "./OperatorSelect"

export default function RechargeCard({

    formData,
    handleChange,
    submitRecharge,
    loading

}) {

    return (

        <div className="
            bg-white
            p-8
            rounded-[32px]
            shadow-2xl
            w-full
            max-w-md
            border
            border-gray-100
        ">

            <h1 className="
                text-4xl
                font-bold
                text-center
                mb-8
            ">
                Recharge
            </h1>

            <div className="space-y-5">

                <div>

                    <label className="
                        block
                        mb-2
                        font-medium
                        text-gray-700
                    ">
                        Recharge Type
                    </label>

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
                            outline-none
                            focus:ring-2
                            focus:ring-black
                        "
                    >

                        <option value="MR">
                            Mobile Recharge
                        </option>

                        <option value="DH">
                            DTH Recharge
                        </option>

                    </select>

                </div>

                <div>

                    <label className="
                        block
                        mb-2
                        font-medium
                        text-gray-700
                    ">
                        Mobile / Customer Number
                    </label>

                    <input
                        type="text"
                        name="mobileNo"
                        placeholder="Enter Number"
                        value={formData.mobileNo}
                        onChange={handleChange}
                        className="
                            w-full
                            border
                            border-gray-300
                            rounded-2xl
                            p-4
                            outline-none
                            focus:ring-2
                            focus:ring-black
                        "
                    />

                </div>

                <div>

                    <label className="
                        block
                        mb-2
                        font-medium
                        text-gray-700
                    ">
                        Select Operator
                    </label>

                    <OperatorSelect
                        value={formData.operatorCode}
                        onChange={(e) =>

                            handleChange({
                                target: {
                                    name: "operatorCode",
                                    value: e.target.value
                                }
                            })

                        }
                        serviceType={formData.serviceType}
                    />

                </div>

                <div>

                    <label className="
                        block
                        mb-2
                        font-medium
                        text-gray-700
                    ">
                        Amount
                    </label>

                    <input
                        type="number"
                        name="amount"
                        placeholder="Enter Amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="
                            w-full
                            border
                            border-gray-300
                            rounded-2xl
                            p-4
                            outline-none
                            focus:ring-2
                            focus:ring-black
                        "
                    />

                </div>

                <button
                    onClick={submitRecharge}
                    className="
                        w-full
                        bg-black
                        hover:bg-gray-900
                        text-white
                        p-4
                        rounded-2xl
                        font-semibold
                        transition-all
                        duration-300
                    "
                >

                    {
                        loading
                            ? "Processing..."
                            : "Recharge Now"
                    }

                </button>

            </div>

        </div>
    )
}