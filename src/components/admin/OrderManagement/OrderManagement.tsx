import React from "react";

const OrderManagement: React.FC = () => {
  // Mock data for orders
  const orders = [
    {
      id: 1001,
      customer: "John Doe",
      date: "2023-05-15",
      total: 89.97,
      status: "Completed",
    },
    {
      id: 1002,
      customer: "Jane Smith",
      date: "2023-05-16",
      total: 129.96,
      status: "Processing",
    },
    {
      id: 1003,
      customer: "Bob Johnson",
      date: "2023-05-17",
      total: 49.99,
      status: "Shipped",
    },
  ];

  return (
    <div className="p-4 bg-[var(--wildlife-bg-light)] rounded-2xl shadow-[var(--wildlife-shadow)]">
      <h2 className="text-2xl font-bold mb-4 text-[var(--wildlife-primary-dark)]">
        Order Management
      </h2>

      <div className="mb-4">
        <button className="bg-[var(--wildlife-primary)] hover:bg-[var(--wildlife-primary-dark)] text-[var(--wildlife-text-light)] px-4 py-2 rounded-md shadow-[var(--wildlife-shadow-hover)] transition">
          View All Orders
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[var(--wildlife-secondary-light)] shadow-sm">
        <table className="min-w-full bg-[var(--wildlife-bg-light)]">
          <thead className="bg-[var(--wildlife-primary-light)] text-[var(--wildlife-text-light)]">
            <tr>
              <th className="py-3 px-4 text-left">Order ID</th>
              <th className="py-3 px-4 text-left">Customer</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Total</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr
                key={order.id}
                className={`transition-colors ${
                  idx % 2 === 0
                    ? "bg-[var(--wildlife-bg-light)]"
                    : "bg-[var(--wildlife-secondary-light)]/30"
                } hover:bg-[var(--wildlife-bg-forest)] hover:text-[var(--wildlife-text-light)]`}
              >
                <td className="py-3 px-4 font-medium">#{order.id}</td>
                <td className="py-3 px-4">{order.customer}</td>
                <td className="py-3 px-4">{order.date}</td>
                <td className="py-3 px-4">${order.total.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === "Completed"
                        ? "bg-[var(--wildlife-success)]/20 text-[var(--wildlife-success)]"
                        : order.status === "Processing"
                        ? "bg-[var(--wildlife-warning)]/20 text-[var(--wildlife-warning)]"
                        : "bg-[var(--wildlife-info)]/20 text-[var(--wildlife-info)]"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button className="text-[var(--wildlife-info)] hover:text-[var(--wildlife-primary-dark)] font-medium mr-3">
                    View
                  </button>
                  <button className="text-[var(--wildlife-success)] hover:text-[var(--wildlife-primary-dark)] font-medium">
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
