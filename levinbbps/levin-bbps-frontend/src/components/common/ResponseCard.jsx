export default function ResponseCard({ response }) {

  if (!response) return null

  return (
    <div className="mt-6 bg-gray-100 rounded-2xl p-5 space-y-3">

      <div>
        <span className="font-semibold">
          Client ID:
        </span>{" "}
        {response.clientId || response.client_id}
      </div>

      <div>
        <span className="font-semibold">
          Transaction ID:
        </span>{" "}
        {response.txnId || response.txnid}
      </div>

      <div>
        <span className="font-semibold">
          Operator Ref:
        </span>{" "}
        {response.operatorRef || response.operator_ref}
      </div>

      <div>
        <span className="font-semibold">
          Status:
        </span>{" "}
        {response.statusId || response.status_id}
      </div>

      <div>
        <span className="font-semibold">
          Message:
        </span>{" "}
        {response.message}
      </div>
    </div>
  )
}