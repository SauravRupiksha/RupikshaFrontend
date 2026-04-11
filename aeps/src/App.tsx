import { useState } from "react";
import LoginOtp from "./pages/LoginOtp";

import AgentProfile from "./pages/AgentProfile";
import AepsOnboard from "./pages/AepsOnboard";
import AepsKyc from "./pages/AepsKyc";
import AepsTwoFA from "./pages/AepsTwoFA";
import AepsTransaction from "./pages/AepsTransaction";
import AepsInfo from "./components/AepsInfo";

import { User } from "lucide-react";

function App() {

const [username,setUsername] = useState(
localStorage.getItem("username")
);

const [showProfile,setShowProfile] = useState(false);
const [openProfile,setOpenProfile] = useState(false);

const handleLogin = (user:any)=>{
localStorage.setItem("username",user);
setUsername(user);
};

const handleLogout = ()=>{
localStorage.clear();
setUsername(null);
};

// OTP Login
if(!username){
return <LoginOtp setIsLoggedIn={handleLogin}/>
}

return (

<div>

{/* Header */}
<div className="header">

<h3>AEPS Dashboard</h3>

<div className="profile-container">

<div 
className="profile-icon"
onClick={()=>setShowProfile(!showProfile)}
>
<User size={20}/>
<span>{username}</span>
</div>

{showProfile && (

<div className="profile-dropdown">

<p className="profile-name">{username}</p>

<button onClick={()=>{
setOpenProfile(true)
setShowProfile(false)
}}>
Agent Profile
</button>

<button onClick={handleLogout}>
Logout
</button>

</div>

)}

</div>

</div>

{/* Profile Modal */}
{openProfile && (
<AgentProfile close={()=>setOpenProfile(false)}/>
)}

<div className="aeps-flex">

<div className="aeps-box">
<AepsOnboard/>
</div>

<div className="aeps-box">
<AepsKyc/>
</div>

<div className="aeps-box">
<AepsTwoFA/>
</div>

<div className="aeps-box">
<AepsTransaction/>
</div>

<div className="aeps-full">
<AepsInfo/>
</div>

</div>

</div>

)

}

export default App;