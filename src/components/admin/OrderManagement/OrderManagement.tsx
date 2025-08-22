import React from 'react';

const OrderManagement: React.FC = () => {
  // Mock data for orders
  const orders = [
    { id: 1001, customer: 'John Doe', date: '2023-05-15', total: 89.97, status: 'Completed' },
    { id: 1002, customer: 'Jane Smith', date: '2023-05-16', total: 129.96, status: 'Processing' },
    { id: 1003, customer: 'Bob Johnson', date: '2023-05-17', total: 49.99, status: 'Shipped' },
  ];

  return (
    <div>
      <div className="mb-4">
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
          View All Orders
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Order ID</th>
              <th className="py-2 px-4 border-b">Customer</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Total</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="py-2 px-4 border-b">#{order.id}</td>
                <td className="py-2 px-4 border-b">{order.customer}</td>
                <td className="py-2 px-4 border-b">{order.date}</td>
                <td className="py-2 px-4 border-b">${order.total}</td>
                <td className="py-2 px-4 border-b">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    order.status === 'Completed' 
                      ? 'bg-green-100 text-green-800' 
                      : order.status === 'Processing' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  <button className="text-blue-500 hover:text-blue-700 mr-2">
                    View
                  </button>
                  <button className="text-green-500 hover:text-green-700">
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