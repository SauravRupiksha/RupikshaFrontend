import { useState } from "react"

import RechargePage
from "./pages/RechargePage"

import BbpsPage
from "./pages/BbpsPage"

function App() {

    const [page, setPage] =
        useState("recharge")

    return (

        <div>

            <div className="
                flex
                gap-4
                justify-center
                p-6
                bg-white
                shadow-md
            ">

                <button
                    onClick={() =>
                        setPage("recharge")
                    }
                    className="
                        bg-black
                        text-white
                        px-6
                        py-3
                        rounded-xl
                    "
                >

                    Recharge

                </button>

                <button
                    onClick={() =>
                        setPage("bbps")
                    }
                    className="
                        bg-blue-600
                        text-white
                        px-6
                        py-3
                        rounded-xl
                    "
                >

                    BBPS

                </button>

            </div>

            {

                page === "recharge"

                ? <RechargePage />

                : <BbpsPage />
            }

        </div>
    )
}

export default App