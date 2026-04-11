import { useState } from "react";

import { aepsKyc, verifyKycOtp } from "../api/aepsApi";

import {
User,
Phone,
CreditCard,
Fingerprint,
Mail
} from "lucide-react";

const AepsKyc = () => {

const [loading,setLoading] = useState(false);

const [showOtp,setShowOtp] = useState(false);

const [kycRefId,setKycRefId] = useState("");
const [clientRefId,setClientRefId] = useState("");

const [response,setResponse] = useState<any>(null);

const [form,setForm] = useState<any>({
aeps_agent_id:"",
merchant_id:"",
aadhar_number:"",
RdpiData:"",
biometricType:"FMR,FIR",
mobile:"",
email:""
});

const [otp,setOtp] = useState("");

const handleChange = (e:any)=>{
setForm({
...form,
[e.target.name]:e.target.value
});
};


// Capture Finger
const captureFinger = () => {

var url = "https://localhost:11100/rd/capture";

var XML = `<PidOptions ver="1.0">
<Opts fCount="1" fType="2" iCount="0" pCount="0" pgCount="2"
format="0" pidVer="2.0" timeout="10000"
pTimeout="20000"
env="P" />
<CustOpts>
<Param name="mantrakey" value="" />
</CustOpts>
</PidOptions>`;

var xhr = new XMLHttpRequest();

xhr.open("CAPTURE", url, true);

xhr.setRequestHeader("Content-Type","text/xml");
xhr.setRequestHeader("Accept","text/xml");

xhr.onreadystatechange = function () {

if (xhr.readyState === 4) {

if (xhr.status === 200) {

const response = xhr.responseText;

const base64 = btoa(unescape(encodeURIComponent(response)));

setForm((prev:any)=>({
...prev,
RdpiData: base64
}));

}else{

alert("Device not ready");

}

}

};

xhr.send(XML);

};


// Submit KYC
const handleSubmit = async (e:any)=>{

e.preventDefault();

setLoading(true);

try{

const res = await aepsKyc(form);

setResponse(res);

if(res.status_id === 19){

setShowOtp(true);
setKycRefId(res.txnid);
setClientRefId(res.refid);

}

if(res.status_id === 1){

localStorage.setItem("kycDone","true");

}

}catch(err){

console.log(err)

}

setLoading(false);

};


// Verify OTP
const handleVerifyOtp = async ()=>{

if(!otp){
alert("Enter OTP");
return;
}

try{

setLoading(true);

const res = await verifyKycOtp({

verifyKycOtp: otp,
email: form.email,
contactNumber: form.mobile,
kycRefId: kycRefId,
clientRefId: clientRefId,
aepsAgentId: form.aeps_agent_id,
merchantId: form.merchant_id

})

setResponse(res);

if(res.status_id === 1){

setShowOtp(false);
localStorage.setItem("kycDone","true");

}

}catch(err){

console.log(err)
alert("OTP verification failed")

}

setLoading(false);

};


return (

<div className="aeps-container">

<div className="aeps-card">

<h2 className="aeps-title">

AEPS KYC

</h2>


<form className="aeps-form" onSubmit={handleSubmit}>

<div className="input-group">
<User size={18}/>
<input name="aeps_agent_id" placeholder=" " onChange={handleChange}/>
<label>AEPS Agent ID</label>
</div>

<div className="input-group">
<User size={18}/>
<input name="merchant_id" placeholder=" " onChange={handleChange}/>
<label>Merchant ID</label>
</div>

<div className="input-group">
<CreditCard size={18}/>
<input name="aadhar_number" placeholder=" " onChange={handleChange}/>
<label>Aadhar Number</label>
</div>

<div className="input-group">
<Phone size={18}/>
<input name="mobile" placeholder=" " onChange={handleChange}/>
<label>Mobile</label>
</div>

<div className="input-group">
<Mail size={18}/>
<input name="email" placeholder=" " onChange={handleChange}/>
<label>Email</label>
</div>

<div className="input-group">
<Fingerprint size={18}/>
<input 
name="RdpiData" 
placeholder=" " 
value={form.RdpiData}
readOnly
/>
<label>Biometric Data</label>
</div>

<div className="input-group">
<Fingerprint size={18}/>
<input name="biometricType" value="FMR,FIR" readOnly/>
<label>Biometric Type</label>
</div>


<button 
type="button"
className="location-btn"
onClick={captureFinger}
>

Capture Finger

</button>


<button className="aeps-button">

{loading ? "Processing..." : "Submit KYC"}

</button>

</form>


{showOtp && (

<div className="response-box">

<h3>Verify OTP</h3>

<div className="input-group">

<input
placeholder="Enter OTP"
value={otp}
onChange={(e)=>setOtp(e.target.value)}
/>

</div>

<button
className="aeps-button"
onClick={handleVerifyOtp}
>

Verify OTP

</button>

</div>

)}


{response && (

<div className="response-box">

<h3>KYC Response</h3>

<p>Status : {response.message}</p>

{response.txnid && (
<p>Txn Id : {response.txnid}</p>
)}

{response.refid && (
<p>Ref Id : {response.refid}</p>
)}

</div>

)}

</div>

</div>

);

};

export default AepsKyc;