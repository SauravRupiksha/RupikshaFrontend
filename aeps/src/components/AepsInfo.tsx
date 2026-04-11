const AepsInfo = () => {

return (

<div className="aeps-info">

<h2 className="aeps-heading">AEPS Services</h2>

<div className="aeps-info-grid">

<div className="info-card">
<h4>Balance Enquiry</h4>
<p>
Check customer's bank account balance instantly using Aadhaar biometric authentication. Fast, secure and reliable service.
</p>
</div>

<div className="info-card">
<h4>Cash Withdrawal</h4>
<p>
Withdraw cash from customer's bank account using Aadhaar biometric authentication. Instant and secure withdrawal facility.
</p>
</div>

<div className="info-card">
<h4>Mini Statement</h4>
<p>
Get last 5–10 transactions instantly. Customers can view recent account activity securely.
</p>
</div>

<div className="info-card">
<h4>Secure Transactions</h4>
<p>
All transactions are protected with Aadhaar biometric authentication ensuring maximum security.
</p>
</div>

</div>

{/* Center Row */}
<div className="aeps-info-center">

<div className="info-card center-card">
<h4>Interoperable Banking</h4>
<p>
Customers can transact from any Aadhaar linked bank without visiting branch.
</p>
</div>

</div>

</div>

)

}

export default AepsInfo;