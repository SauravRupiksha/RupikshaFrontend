import axiosClient from "../api/axiosClient"

export const rechargeApi = async (payload) => {

  const response = await axiosClient.post(
    "/levin/recharge",
    payload
  )

  return response.data
}

export const fetchBillApi = async (payload) => {

  const response = await axiosClient.post(
    "/levin/bbps/fetch-bill",
    payload
  )

  return response.data
}

export const payBillApi = async (payload) => {

  const response = await axiosClient.post(
    "/levin/bbps/pay-bill",
    payload
  )

  return response.data
}