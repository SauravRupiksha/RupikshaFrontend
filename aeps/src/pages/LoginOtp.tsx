import Signup from "./Signup";
import { useState } from "react";
import { sendOtp, verifyOtp, checkUser } from "../api/aepsApi";

import { Phone, Lock } from "lucide-react";

const LoginOtp = ({ setIsLoggedIn }: any) => {

const [mobile,setMobile] = useState("");
const [otp,setOtp] = useState("");
const [showOtp,setShowOtp] = useState(false);
const [showSignup,setShowSignup] = useState(false);
const [loading,setLoading] = useState(false);


// Send OTP
const handleSendOtp = async ()=>{

if(mobile.length !== 10){
alert("Enter valid mobile number");
return;
}

setLoading(true);

try{

const exists = await checkUser({ mobile: mobile.trim() });

if(!exists){
setShowSignup(true);
setLoading(false);
return;
}

await sendOtp({ mobile: mobile.trim() });

setShowOtp(true);

}catch(err){

alert("Something went wrong");

}

setLoading(false);

};


// Verify OTP
const handleVerify = async ()=>{

setLoading(true);

try{

const res = await verifyOtp({
mobile: mobile.trim(),
otp
});

if(res.success){

// ✅ Save correct mobile
localStorage.setItem("username", mobile.trim());

setIsLoggedIn(mobile.trim());

}else{

alert("Invalid OTP");

}

}catch(err){

alert("Verification failed");

}

setLoading(false);

};


return(

<div className="login-container">

<div className="login-card">

<h2 className="login-title">
AEPS Login
</h2>

<div className="input-group">
<Phone size={18}/>
<input
placeholder=" "
value={mobile}
onChange={(e)=>setMobile(e.target.value)}
/>
<label>Mobile Number</label>
</div>

{!showOtp && (

<button 
className="login-button"
onClick={handleSendOtp}
>
{loading ? "Sending..." : "Send OTP"}
</button>

)}

{showOtp && (

<>

<div className="input-group">
<Lock size={18}/>
<input
placeholder=" "
value={otp}
onChange={(e)=>setOtp(e.target.value)}
/>
<label>Enter OTP</label>
</div>

<button 
className="login-button"
onClick={handleVerify}
>
{loading ? "Verifying..." : "Verify OTP"}
</button>

</>

)}

<p 
className="signup-text"
onClick={()=>setShowSignup(true)}
>
New User? Please Signup
</p>

</div>

{/* Signup Modal */}
{showSignup && (
<Signup 
mobile={mobile}
setShowSignup={setShowSignup}
/>
)}

</div>

)

}

export default LoginOtp;