import React, { useState, useEffect } from "react";
import userService, { type User } from "../../../services/userService";

const CustomerManagement: React.FC = () => {
  const [customers, setCustomers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const users = await userService.getAllUsers();
        setCustomers(users);
      } catch (err: any) {
        setError(err.message || "Failed to fetch customers");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[var(--wildlife-primary)]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-[var(--wildlife-error)] font-semibold">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-[var(--wildlife-bg-light)] rounded-2xl shadow-[var(--wildlife-shadow)]">
      <h2 className="text-2xl font-bold mb-4 text-[var(--wildlife-primary-dark)]">
        Customer Management
      </h2>

      <div className="overflow-x-auto rounded-xl border border-[var(--wildlife-secondary-light)] shadow-sm">
        <table className="min-w-full bg-[var(--wildlife-bg-light)]">
          <thead className="bg-[var(--wildlife-primary-light)] text-[var(--wildlife-text-light)]">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, idx) => (
              <tr
                key={customer.id}
                className={`transition-colors ${
                  idx % 2 === 0
                    ? "bg-[var(--wildlife-bg-light)]"
                    : "bg-[var(--wildlife-secondary-light)]/30"
                } hover:bg-[var(--wildlife-bg-forest)] hover:text-[var(--wildlife-text-light)]`}
              >
                <td className="py-3 px-4">{customer.id}</td>
                <td className="py-3 px-4">{customer.displayName}</td>
                <td className="py-3 px-4">{customer.email}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      customer.accountStatus === "ACTIVE"
                        ? "bg-[var(--wildlife-success)]/20 text-[var(--wildlife-success)]"
                        : "bg-[var(--wildlife-error)]/20 text-[var(--wildlife-error)]"
                    }`}
                  >
                    {customer.accountStatus}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button className="text-[var(--wildlife-info)] hover:text-[var(--wildlife-primary-dark)] font-medium mr-3">
                    Edit
                  </button>
                  <button className="text-[var(--wildlife-error)] hover:text-red-700 font-medium">
                    Delete
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

export default CustomerManagement;
