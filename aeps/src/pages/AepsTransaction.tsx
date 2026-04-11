import { banks } from "../data/banks";
import { useState, useEffect } from "react";
import { aepsTransaction, getAgentProfile } from "../api/aepsApi";

import {
Phone,
CreditCard,
Fingerprint
} from "lucide-react";

const AepsTransaction = () => {

const [loading,setLoading] = useState(false);
const [response,setResponse] = useState<any>(null);

const [form,setForm] = useState<any>({
mobileNumber:"",
adharNumber:"",
pidData:"",
aepsMethod:"152",
amount:"",
customerMobileNumber:"",
aepsBankName:"",
aepsBankCode:"",
latitude:"",
longitude:"",
biometricType:"FMR,FIR",
name:"",
pinCode:"",
address:"",
shopName:"",
city:"",
state:""
});


// Auto Fill Agent Profile
useEffect(()=>{

const mobile = localStorage.getItem("username");

if(mobile){

getAgentProfile(mobile).then((res:any)=>{

if(res){

setForm((prev:any)=>({

...prev,

mobileNumber: mobile,
name: res.name,
pinCode: res.pinCode,
address: res.address,
shopName: res.shopName,
city: res.city,
state: res.state,
latitude: res.latitude,
longitude: res.longitude

}));

}

});

}

},[]);


const handleChange = (e:any)=>{
setForm({
...form,
[e.target.name]:e.target.value
});
};

const handleBankChange = (e:any)=>{

const selectedBank =
banks.find(
(bank)=> bank.name === e.target.value
);

setForm({
...form,
aepsBankName: selectedBank?.name || "",
aepsBankCode: selectedBank?.code || ""
});

};


const captureFinger = () => {

var url = "https://localhost:11100/rd/capture";

var XML = `<PidOptions ver="1.0">
<Opts fCount="1" fType="2" iCount="0" pCount="0"
format="0"
pidVer="2.0"
timeout="10000"
env="P" />
</PidOptions>`;

var xhr = new XMLHttpRequest();

xhr.open("CAPTURE", url, true);

xhr.setRequestHeader("Content-Type","text/xml");
xhr.setRequestHeader("Accept","text/xml");

xhr.onreadystatechange = function () {

if (xhr.readyState === 4 && xhr.status === 200) {

const response = xhr.responseText;

const base64 =
btoa(unescape(encodeURIComponent(response)));

setForm((prev:any)=>({
...prev,
pidData: base64
}));

alert("Fingerprint Captured");

}

};

xhr.send(XML);

};


const handleSubmit = async (e:any)=>{

e.preventDefault();

setLoading(true);

try{

const res = await aepsTransaction(form);

setResponse(res);

}catch(err){

console.log(err);

}

setLoading(false);

};


return (

<div className="aeps-container">

<div className="aeps-card">

<h2 className="aeps-title">
AEPS Transaction
</h2>

<form className="aeps-form" onSubmit={handleSubmit}>

<div className="input-group">
<CreditCard size={18}/>
<select 
name="aepsMethod"
value={form.aepsMethod}
onChange={handleChange}
>
<option value="152">Balance Enquiry</option>
<option value="188">Withdraw</option>
<option value="177">Mini Statement</option>
</select>
<label>Transaction Type</label>
</div>

<div className="input-group">
<CreditCard size={18}/>
<input 
name="adharNumber"
placeholder=" " 
onChange={handleChange}
/>
<label>Aadhar Number</label>
</div>

{
form.aepsMethod === "188" && (

<div className="input-group">
<CreditCard size={18}/>
<input 
name="amount"
placeholder=" " 
onChange={handleChange}
/>
<label>Amount</label>
</div>

)
}

<div className="input-group">
<Phone size={18}/>
<input 
name="customerMobileNumber"
placeholder=" " 
onChange={handleChange}
/>
<label>Customer Mobile</label>
</div>

<div className="input-group">
<CreditCard size={18}/>
<select
name="aepsBankName"
value={form.aepsBankName}
onChange={handleBankChange}
>
<option value="">Select Bank</option>
{
banks.map((bank)=>(
<option key={bank.id} value={bank.name}>
{bank.name}
</option>
))
}
</select>
<label>Bank Name</label>
</div>

<div className="input-group">
<CreditCard size={18}/>
<input
name="aepsBankCode"
value={form.aepsBankCode}
readOnly
placeholder=" "
/>
<label>Bank Code</label>
</div>

<div className="input-group">
<Fingerprint size={18}/>
<input 
name="pidData"
value={form.pidData}
readOnly
placeholder=" "
/>
<label>Biometric</label>
</div>

<button
type="button"
className="location-btn"
onClick={captureFinger}
>
Capture Finger
</button>

<button className="aeps-button">
{loading ? "Processing..." : "Submit"}
</button>

</form>

{response && (

<div className="response-box">

<h3>Transaction Response</h3>

<p>Status : {response.message}</p>
<p>Bank : {response.bank_name}</p>

{response.AvailableBalance && (
<p>Balance : {response.AvailableBalance}</p>
)}

{response.RRN && (
<p>RRN : {response.RRN}</p>
)}

{response.txnid && (
<p>Txn ID : {response.txnid}</p>
)}

</div>

)}

</div>

</div>

);

};

export default AepsTransaction;