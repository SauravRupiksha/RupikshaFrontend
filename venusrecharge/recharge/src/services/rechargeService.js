import { rechargeApi } from "../api/rechargeApi"

export const doRecharge = async (payload) => {

    return await rechargeApi(payload)
}