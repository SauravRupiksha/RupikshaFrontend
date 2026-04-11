import { useState, useEffect } from "react";
import { User, MapPin, Home, X } from "lucide-react";

import { 
getAgentProfile, 
saveAgentProfile,
getTransactionHistory 
} from "../api/aepsApi";

const AgentProfile = ({close}:any) => {

const [tab,setTab] = useState("profile");

const [history,setHistory] = useState<any[]>([]);

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

getTransactionHistory(mobile).then((res:any)=>{
setHistory(res || []);
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
Agent Panel
</h2>

<X 
size={18}
className="close-icon"
onClick={close}
/>

</div>


{/* Tabs */}

<div style={{display:"flex",gap:"10px",marginBottom:"10px"}}>

<button 
className="aeps-button"
onClick={()=>setTab("profile")}
>
Profile
</button>

<button 
className="aeps-button"
onClick={()=>setTab("history")}
>
Transaction History
</button>

</div>


{/* PROFILE */}

{tab === "profile" && (

<div className="aeps-form">

<div className="input-group">
<User size={18}/>
<input name="agentId" value={form.agentId} onChange={handleChange} placeholder=" "/>
<label>Agent ID</label>
</div>

<div className="input-group">
<User size={18}/>
<input name="merchantId" value={form.merchantId} onChange={handleChange} placeholder=" "/>
<label>Merchant ID</label>
</div>

<div className="input-group">
<User size={18}/>
<input name="name" value={form.name} onChange={handleChange} placeholder=" "/>
<label>Agent Name</label>
</div>

<div className="input-group">
<Home size={18}/>
<input name="shopName" value={form.shopName} onChange={handleChange} placeholder=" "/>
<label>Shop Name</label>
</div>

<div className="input-group">
<Home size={18}/>
<input name="address" value={form.address} onChange={handleChange} placeholder=" "/>
<label>Address</label>
</div>

<div className="input-group">
<MapPin size={18}/>
<input name="city" value={form.city} onChange={handleChange} placeholder=" "/>
<label>City</label>
</div>

<div className="input-group">
<MapPin size={18}/>
<input name="state" value={form.state} onChange={handleChange} placeholder=" "/>
<label>State</label>
</div>

<div className="input-group">
<MapPin size={18}/>
<input name="pinCode" value={form.pinCode} onChange={handleChange} placeholder=" "/>
<label>Pin Code</label>
</div>

<button className="location-btn" onClick={getLocation}>
Get Location
</button>

<button className="aeps-button" onClick={handleSave}>
Save Profile
</button>

</div>

)}


{/* HISTORY */}

{tab === "history" && (

<div>

<table className="history-table">

<thead>
<tr>
<th>Date</th>
<th>Amount</th>
<th>Bank</th>
<th>Status</th>
</tr>
</thead>

<tbody>

{history.length === 0 && (
<tr>
<td colSpan={4}>
No Transactions
</td>
</tr>
)}

{history.map((item:any,index:number)=>(
<tr key={index}>
<td>{item.createdAt}</td>
<td>{item.amount}</td>
<td>{item.bankName}</td>
<td>{item.status}</td>
</tr>
))}

</tbody>

</table>

</div>

)}

</div>

</div>

);

};

export default AgentProfile;