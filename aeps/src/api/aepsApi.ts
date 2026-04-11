import axios from "axios";

const API = import.meta.env.VITE_AEPS_API;


// ================= AUTH =================

import type {
SignupRequest,
CheckUserRequest,
SendOtpRequest,
VerifyOtpRequest,
AgentProfileRequest
} from "../types/aeps";

export const signupUser = async (data: SignupRequest) => {
const res = await axios.post(`${API}/auth/signup`, data);
return res.data;
};

export const checkUser = async (data: CheckUserRequest) => {
const res = await axios.post(`${API}/auth/check-user`, data);
return res.data;
};

export const sendOtp = async (data: SendOtpRequest) => {
const res = await axios.post(`${API}/auth/send-otp`, data);
return res.data;
};

export const verifyOtp = async (data: VerifyOtpRequest) => {
const res = await axios.post(`${API}/auth/verify-otp`, data);
return res.data;
};


// ================= AEPS =================

import type { AepsOnboardRequest } from "../types/aeps";

export const onboardAgent = async (data: AepsOnboardRequest) => {
const res = await axios.post(`${API}/onboard`, data);
return res.data;
};


// ================= KYC =================

import type {
AepsKycRequest,
AepsKycOtpRequest,
AepsTwoFARequest,
AepsTransactionRequest
} from "../types/aeps";

export const aepsKyc = async (data: AepsKycRequest) => {
const res = await axios.post(`${API}/aeps-kyc`, data);
return res.data;
};

export const verifyKycOtp = async (data: AepsKycOtpRequest) => {
const res = await axios.post(`${API}/aeps-kyc-otp-verify`, data);
return res.data;
};

export const aepsTwoFA = async (data: AepsTwoFARequest) => {
const res = await axios.post(`${API}/aeps-twofa`, data);
return res.data;
};

export const aepsTransaction = async (
data:AepsTransactionRequest
)=>{
const res = await axios.post(`${API}/transaction`, data);
return res.data;
};


// ================= AGENT PROFILE =================

export const saveAgentProfile = async (
data:AgentProfileRequest
)=>{

const res = await axios.post(
`${API}/agent/save`,
data
)

return res.data

}

export const getAgentProfile = async (
mobile:string
)=>{

const res = await axios.get(
`${API}/agent/${mobile}`
)

return res.data

}