import { useState } from "react";

import { onboardAgent, saveAgentProfile } from "../api/aepsApi";

import {
User,
Mail,
Phone,
CreditCard,
MapPin,
Home
} from "lucide-react";

const AepsOnboard = () => {
 
const [loading, setLoading] = useState(false);

const [form, setForm] = useState<any>({
fname:"",
middlename:"",
lname:"",
pan_card:"",
aadhar_number:"",
pinCode:"",
address:"",
aeps_mobile:"",
state:"",
shop_name:"",
city:"",
latitude:"",
longitude:"",
email:""
});

const [errors, setErrors] = useState<any>({});
const [response, setResponse] = useState<any>(null);

const handleChange = (e: any) => {
setForm({
...form,
[e.target.name]: e.target.value
});
};

const getLocation = () => {

setForm((prev:any)=>({
...prev,
latitude:"26.6745",
longitude:"84.9160"
}));

};

const validate = () => {

let err:any = {};

const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const aadharRegex = /^[0-9]{12}$/;

if(!form.fname) err.fname = "First name required";
if(!form.lname) err.lname = "Last name required";

if(!form.pan_card)
err.pan="PAN required";
else if(!panRegex.test(form.pan_card))
err.pan="Invalid PAN";

if(!form.aadhar_number)
err.aadhar="Aadhar required";
else if(!aadharRegex.test(form.aadhar_number))
err.aadhar="Invalid Aadhar";

if(!form.aeps_mobile) err.mobile="Mobile required";
if(!form.email) err.email="Email required";
if(!form.address) err.address="Address required";

setErrors(err);

return Object.keys(err).length === 0;

};

const handleSubmit = async (e:any)=>{

e.preventDefault();

if(!validate()) return;

setLoading(true);

try{

const res = await onboardAgent(form);

setResponse(res);

// onboarding already done
if(res.message?.toLowerCase().includes("already")){
alert("You have already done onboarding");
}

// auto save agent profile
if(res.agentId){

await saveAgentProfile({

mobile: form.aeps_mobile,
agentId: res.agentId,
merchantId: res.merchant_id,

name: `${form.fname} ${form.lname}`,
shopName: form.shop_name,
address: form.address,
city: form.city,
state: form.state,
pinCode: form.pinCode,

latitude: form.latitude,
longitude: form.longitude

})

}

}catch(err){
console.log(err);
alert("Onboarding Failed");
}

setLoading(false);

};

return (

<div className="aeps-container">

<div className="aeps-card">

<h2 className="aeps-title">
AEPS Agent Onboarding
</h2>

<form className="aeps-form" onSubmit={handleSubmit}>

<div className="input-group">
<User size={18}/>
<input name="fname" placeholder=" " onChange={handleChange}/>
<label>First Name</label>
</div>

<div className="input-group">
<User size={18}/>
<input name="middlename" placeholder=" " onChange={handleChange}/>
<label>Middle Name</label>
</div>

<div className="input-group">
<User size={18}/>
<input name="lname" placeholder=" " onChange={handleChange}/>
<label>Last Name</label>
</div>

<div className="input-group">
<CreditCard size={18}/>
<input name="pan_card" placeholder=" " onChange={handleChange}/>
<label>PAN Number</label>
</div>

<div className="input-group">
<CreditCard size={18}/>
<input name="aadhar_number" placeholder=" " onChange={handleChange}/>
<label>Aadhar Number</label>
</div>

<div className="input-group">
<Phone size={18}/>
<input name="aeps_mobile" placeholder=" " onChange={handleChange}/>
<label>Mobile</label>
</div>

<div className="input-group">
<Mail size={18}/>
<input name="email" placeholder=" " onChange={handleChange}/>
<label>Email</label>
</div>

<div className="input-group">
<Home size={18}/>
<input name="address" placeholder=" " onChange={handleChange}/>
<label>Address</label>
</div>

<div className="input-group">
<MapPin size={18}/>
<input name="city" placeholder=" " onChange={handleChange}/>
<label>City</label>
</div>

<div className="input-group">
<MapPin size={18}/>
<input name="state" placeholder=" " onChange={handleChange}/>
<label>State</label>
</div>

<div className="input-group">
<MapPin size={18}/>
<input name="pinCode" placeholder=" " onChange={handleChange}/>
<label>Pin Code</label>
</div>

<div className="input-group">
<Home size={18}/>
<input name="shop_name" placeholder=" " onChange={handleChange}/>
<label>Shop Name</label>
</div>

{/* Geolocation unchanged */}

<div className="input-group">
<MapPin size={18}/>
<input 
name="latitude" 
placeholder=" "
value={form.latitude || ""}
readOnly
/>
<label>Latitude</label>
</div>

<div className="input-group">
<MapPin size={18}/>
<input 
name="longitude" 
placeholder=" "
value={form.longitude || ""}
readOnly
/>
<label>Longitude</label>
</div>

<button 
type="button"
className="location-btn"
onClick={getLocation}
>
📍 Get Current Location
</button>

<button className="aeps-button">
{loading ? "Processing..." : "Submit Onboarding"}
</button>

</form>

{response && (
<div className="response-box">
<p>Agent ID : {response.agentId}</p>
<p>Merchant ID : {response.merchant_id}</p>
<p>{response.message}</p>
</div>
)}

</div>

</div>

);

};

export default AepsOnboard;