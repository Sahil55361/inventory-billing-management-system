import BillingForm from '../components/BillingForm'

export default function BillingPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Billing</h1>
      <BillingForm onBillCreated={() => {}} />
    </div>
  )
}