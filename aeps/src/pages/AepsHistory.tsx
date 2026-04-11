import { useEffect, useState } from "react";
import { getTransactionHistory } from "../api/aepsApi";

const AepsHistory = () => {

const [data,setData] = useState<any[]>([]);
const [loading,setLoading] = useState(false);

useEffect(()=>{

const mobile = localStorage.getItem("username");

if(mobile){

setLoading(true);

getTransactionHistory(mobile)
.then((res:any)=>{
setData(res);
})
.catch((err)=>{
console.log(err);
})
.finally(()=>{
setLoading(false);
});

}

},[]);

return (

<div className="aeps-container">

<div className="aeps-card">

<h2 className="aeps-title">
Transaction History
</h2>

{loading && <p>Loading...</p>}

<table className="history-table">

<thead>
<tr>
<th>Date</th>
<th>Amount</th>
<th>Bank</th>
<th>Status</th>
<th>RRN</th>
</tr>
</thead>

<tbody>

{data.length === 0 && (
<tr>
<td colSpan={5}>
No Transactions Found
</td>
</tr>
)}

{data.map((item:any,index:number)=>(
<tr key={index}>
<td>{item.createdAt}</td>
<td>{item.amount}</td>
<td>{item.bankName}</td>
<td>{item.status}</td>
<td>{item.rrn}</td>
</tr>
))}

</tbody>

</table>

</div>

</div>

);

};

export default AepsHistory;