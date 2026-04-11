import { useState, useEffect } from "react";
import { User, MapPin, Home, X } from "lucide-react";

import { getAgentProfile, saveAgentProfile } from "../api/aepsApi";

const AgentProfile = ({close}:any) => {

const [form,setForm] = useState<any>({
agentId:"",
merchantId:"",
mobile:"",
name:"",
shopName:"",
address:"",
city:"",
state:"",
pinCode:"",
latitude:"",
longitude:""
});

useEffect(()=>{

const mobile = localStorage.getItem("username");

if(mobile){

getAgentProfile(mobile).then((res:any)=>{

if(res){
setForm(res);
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


const getLocation = ()=>{

navigator.geolocation.getCurrentPosition((pos)=>{

setForm((prev:any)=>({
...prev,
latitude:pos.coords.latitude,
longitude:pos.coords.longitude
}));

});

};


const handleSave = async ()=>{

const mobile = localStorage.getItem("username");

await saveAgentProfile({
...form,
mobile
});

alert("Agent Profile Saved");

close();

};


return (

<div className="profile-modal">

<div className="profile-card aeps-card">

{/* Header */}
<div className="profile-header">

<h2 className="aeps-title">
Agent Profile
</h2>

<X 
size={18}
className="close-icon"
onClick={close}
/>

</div>

<div className="aeps-form">

<div className="input-group">
<User size={18}/>
<input 
name="agentId" 
value={form.agentId} 
onChange={handleChange} 
placeholder=" "
/>
<label>Agent ID</label>
</div>

<div className="input-group">
<User size={18}/>
<input 
name="merchantId" 
value={form.merchantId} 
onChange={handleChange} 
placeholder=" "
/>
<label>Merchant ID</label>
</div>

<div className="input-group">
<User size={18}/>
<input 
name="name" 
value={form.name} 
onChange={handleChange} 
placeholder=" "
/>
<label>Agent Name</label>
</div>

<div className="input-group">
<Home size={18}/>
<input 
name="shopName" 
value={form.shopName} 
onChange={handleChange} 
placeholder=" "
/>
<label>Shop Name</label>
</div>

<div className="input-group">
<Home size={18}/>
<input 
name="address" 
value={form.address} 
onChange={handleChange} 
placeholder=" "
/>
<label>Address</label>
</div>

<div className="input-group">
<MapPin size={18}/>
<input 
name="city" 
value={form.city} 
onChange={handleChange} 
placeholder=" "
/>
<label>City</label>
</div>

<div className="input-group">
<MapPin size={18}/>
<input 
name="state" 
value={form.state} 
onChange={handleChange} 
placeholder=" "
/>
<label>State</label>
</div>

<div className="input-group">
<MapPin size={18}/>
<input 
name="pinCode" 
value={form.pinCode} 
onChange={handleChange} 
placeholder=" "
/>
<label>Pin Code</label>
</div>

<div className="input-group">
<MapPin size={18}/>
<input 
value={form.latitude} 
readOnly 
placeholder=" "
/>
<label>Latitude</label>
</div>

<div className="input-group">
<MapPin size={18}/>
<input 
value={form.longitude} 
readOnly 
placeholder=" "
/>
<label>Longitude</label>
</div>

<button 
className="location-btn"
onClick={getLocation}
>
Get Location
</button>

<button 
className="aeps-button"
onClick={handleSave}
>
Save Profile
</button>

</div>

</div>

</div>

);

};

export default AgentProfile;