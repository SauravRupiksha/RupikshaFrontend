import { useState } from "react";
import { aepsTwoFA } from "../api/aepsApi";

import {
Phone,
CreditCard,
MapPin,
Fingerprint
} from "lucide-react";

const AepsTwoFA = () => {

const [loading,setLoading] = useState(false);
const [response,setResponse] = useState<any>(null);

const [form,setForm] = useState<any>({
mobileNumber:"",
adharNumber:"",
pidData:"",
merchantId:"",
aepsAgentId:"",
latitude:"",
longitude:"",
biometricType:"FMR,FIR"
});

const handleChange = (e:any)=>{
setForm({
...form,
[e.target.name]:e.target.value
});
};


const captureFinger = () => {

var url = "https://localhost:11100/rd/capture";

var XML = `<PidOptions ver="1.0">
<Opts fCount="1" fType="2" iCount="0" pCount="0" pgCount="2"
format="0" pidVer="2.0" timeout="10000"
pTimeout="20000"
env="P" />
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
pidData: base64
}));

}else{

alert("Device not ready");

}

}

};

xhr.send(XML);

};


const getLocation = ()=>{

setForm((prev:any)=>({
...prev,
latitude:"26.6745",
longitude:"84.9160"
}));

};


const handleSubmit = async (e:any)=>{

e.preventDefault();

setLoading(true);

try{

const res = await aepsTwoFA(form);

setResponse(res);

// 2FA success
if(res.status_id === 1){
localStorage.setItem("twofaDone","true");
}

}catch(err){

console.log(err);

}

setLoading(false);

};


return (

<div className="aeps-container">

<div className="aeps-card">

<h2 className="aeps-title">
AEPS Daily 2FA
</h2>

<form className="aeps-form" onSubmit={handleSubmit}>

<div className="input-group">
<Phone size={18}/>
<input name="mobileNumber" placeholder=" " onChange={handleChange}/>
<label>Mobile Number</label>
</div>

<div className="input-group">
<CreditCard size={18}/>
<input name="adharNumber" placeholder=" " onChange={handleChange}/>
<label>Aadhar Number</label>
</div>

<div className="input-group">
<CreditCard size={18}/>
<input name="merchantId" placeholder=" " onChange={handleChange}/>
<label>Merchant ID</label>
</div>

<div className="input-group">
<CreditCard size={18}/>
<input 
name="aepsAgentId"
placeholder=" " 
onChange={handleChange}
/>
<label>AEPS Agent ID</label>
</div>

<div className="input-group">
<Fingerprint size={18}/>
<input 
name="pidData"
value={form.pidData}
readOnly
placeholder=" "
/>
<label>Biometric Data</label>
</div>

<button
type="button"
className="location-btn"
onClick={captureFinger}
>
Capture Finger
</button>

<div className="input-group">
<MapPin size={18}/>
<input 
name="latitude"
value={form.latitude}
readOnly
placeholder=" "
/>
<label>Latitude</label>
</div>

<div className="input-group">
<MapPin size={18}/>
<input 
name="longitude"
value={form.longitude}
readOnly
placeholder=" "
/>
<label>Longitude</label>
</div>

<button
type="button"
className="location-btn"
onClick={getLocation}
>
Get Location
</button>

<button className="aeps-button">
{loading ? "Processing..." : "Submit 2FA"}
</button>

</form>


{/* 2FA Response */}
{response && (

<div className="response-box">

<h3>2FA Response</h3>

<p>Status : {response.message}</p>

{response.RRN && (
<p>RRN : {response.RRN}</p>
)}

{response.txnid && (
<p>Txn ID : {response.txnid}</p>
)}

{response.bank_name && (
<p>Bank : {response.bank_name}</p>
)}

{response.AvailableBalance && (
<p>Balance : {response.AvailableBalance}</p>
)}

</div>

)}

</div>

</div>

);

};

export default AepsTwoFA;