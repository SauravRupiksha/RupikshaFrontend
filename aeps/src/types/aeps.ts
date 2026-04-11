export interface AepsOnboardRequest {
  fname: string;
  middlename?: string;
  lname: string;
  pan_card: string;
  aadhar_number: string;
  pinCode: string;
  address: string;
  aeps_mobile: string;
  state: string;
  shop_name: string;
  city: string;
  latitude: string;
  longitude: string;
  email: string;
}

export interface AepsOnboardResponse {
  agentId: string;
  description: string | null;
  merchant_id: string;
  message: string;
  status_id: number;
}
 //***********************************************kyc */
 export interface AepsKycRequest {
  aeps_agent_id: string;
  merchant_id: string;
  aadhar_number: string;
  RdpiData: string;
  biometricType: string;
  mobile: string;
}

export interface AepsKycResponse {
  agentId: string | null;
  merchant_id: string | null;
  message: string;
  refid: string;
  status_id: number;
  txnid: number;
}

export interface AepsKycOtpRequest {
  verifyKycOtp: string;
  email: string;
  contactNumber: string;
  kycRefId: string;
  clientRefId: string;
  aepsAgentId: string;
  merchantId: string;
}

export interface AepsKycOtpResponse {
  agentId: string;
  merchant_id: string;
  message: string;
  status_id: number;
  txnid: string | null;
}
// *********************************************** 2FA

export interface AepsTwoFARequest {
  mobileNumber: string;
  adharNumber: string;
  pidData: string;
  merchantId: string;
  aeps_agent_id: string;
  latitude: string;
  longitude: string;
  biometricType: string;
}

export interface AepsTwoFAResponse {
  status_id: number;
  message: string;
  RRN: string;
  txnid: number;
  bank_name: string;
  AvailableBalance: string;
  aeps_mta_id: string;
}
// ================= TRANSACTION =================

export interface AepsTransactionRequest {

mobileNumber: string
adharNumber: string
pidData: string

aepsMethod: string
amount?: string

customerMobileNumber: string

aepsBankName: string
aepsBankCode: string

latitude: string
longitude: string

biometricType: string

name: string
pinCode: string
address: string
shopName: string
city: string
state: string

}


export interface AepsTransactionResponse {

status_id: number
message: string

RRN?: string
bank_name?: string
AvailableBalance?: string
txnid?: string
customer_mobile?: string

status?: string
error_code?: string

balance?: string
timestamp?: string
transaction_id?: string
bank_rrn?: string
response_code?: string

}
// ================= AUTH =================

export interface SignupRequest {
  name: string
  email: string
  mobile: string
  dob: string
}

export interface SignupResponse {
  message: string
  success: boolean
}

export interface CheckUserRequest {
  mobile: string
}

export interface CheckUserResponse {
  exists: boolean
}

export interface SendOtpRequest {
  mobile: string
}

export interface SendOtpResponse {
  message: string
  success: boolean
}

export interface VerifyOtpRequest {
  mobile: string
  otp: string
}

export interface VerifyOtpResponse {
  message: string
  success: boolean
}

// ================= AGENT PROFILE =================

export interface AgentProfileRequest {

mobile: string
agentId: string
merchantId: string

name: string
shopName: string
address: string
city: string
state: string
pinCode: string

latitude: string
longitude: string

}

export interface AgentProfileResponse {

id: number
mobile: string
agentId: string
merchantId: string

name: string
shopName: string
address: string
city: string
state: string
pinCode: string

latitude: string
longitude: string

}