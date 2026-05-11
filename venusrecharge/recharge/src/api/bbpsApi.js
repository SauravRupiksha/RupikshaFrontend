import axios from "axios"

const BASE_URL =
    "http://13.233.206.88:8080"

export const fetchBillApi =
    async (payload) => {

    const response =
        await axios.post(

            `${BASE_URL}/api/bbps/fetch-bill`,

            payload
        )

    return response.data
}

export const payBillApi =
    async (payload) => {

    const response =
        await axios.post(

            `${BASE_URL}/api/bbps/pay-bill`,

            payload
        )

    return response.data
}