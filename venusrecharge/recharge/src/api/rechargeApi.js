import axios from "axios"

const BASE_URL = "http://13.233.206.88:8080"

export const rechargeApi = async (payload) => {

    const response = await axios.post(
        `${BASE_URL}/api/recharge`,
        payload
    )

    return response.data
}