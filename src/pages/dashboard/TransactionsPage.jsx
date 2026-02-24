import { getOrders } from '../../utils/storage';

function TransactionsPage() {
  const transactions = getOrders().map((order) => ({
    id: `TXN-${order.id.replace('ORD-', '')}`,
    customer: order.userName || 'Customer',
    amount: order.amount,
    status: order.status === 'Placed' ? 'Success' : order.status,
  }));

  return (
    <div className="space-y-4">
      <h1 className="section-title">Transactions</h1>
      <div className="card overflow-x-auto">
        <table className="w-full min-w-[460px] text-left text-sm">
          <thead>
            <tr className="border-b border-tribal-200 text-tribal-800">
              <th className="py-2">Transaction ID</th>
              <th className="py-2">Customer</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td className="py-3 text-tribal-700" colSpan={4}>No transactions yet.</td>
              </tr>
            ) : null}
            {transactions.map((item) => (
              <tr key={item.id} className="border-b border-tribal-100">
                <td className="py-2">{item.id}</td>
                <td className="py-2">{item.customer}</td>
                <td className="py-2">${item.amount}</td>
                <td className="py-2">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionsPage;
