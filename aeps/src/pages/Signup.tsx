import { useState } from "react";
import axios from "axios";

import {
User,
Mail,
Calendar,
X
} from "lucide-react";

const API = import.meta.env.VITE_AEPS_API;

const Signup = ({mobile,setShowSignup}:any)=>{

const [form,setForm] = useState({
name:"",
email:"",
dob:""
});

const [loading,setLoading] = useState(false);

const handleChange = (e:any)=>{
setForm({
...form,
[e.target.name]:e.target.value
});
};

const handleSignup = async ()=>{

setLoading(true);

await axios.post(`${API}/auth/signup`,{
...form,
mobile
});

alert("Signup Success. OTP Sent");

setShowSignup(false);
setLoading(false);

};

return(

<div className="signup-modal">

<div className="signup-card">

<div className="signup-header">

<h3 className="aeps-title">
Signup
</h3>

<X 
size={18}
className="close-icon"
onClick={()=>setShowSignup(false)}
/>

</div>

<div className="aeps-form">

<div className="input-group">
<User size={18}/>
<input
name="name"
placeholder=" "
onChange={handleChange}
/>
<label>Name</label>
</div>

<div className="input-group">
<Mail size={18}/>
<input
name="email"
placeholder=" "
onChange={handleChange}
/>
<label>Email</label>
</div>

<div className="input-group">
<Calendar size={18}/>
<input
type="date"
name="dob"
onChange={handleChange}
/>
<label>Date of Birth</label>
</div>

<button 
className="aeps-button"
onClick={handleSignup}
>
{loading ? "Processing..." : "Signup"}
</button>

</div>

</div>

</div>

)

}

export default Signup;