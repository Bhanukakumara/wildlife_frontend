import React, { useState } from 'react';
import AddProductForm from './AddProductForm';

const ProductManagement: React.FC = () => {
  // Mock data for products
  const products = [
    { id: 1, name: 'Wildlife Photo 1', category: 'Mammals', price: 29.99, status: 'Active' },
    { id: 2, name: 'Wildlife Photo 2', category: 'Birds', price: 39.99, status: 'Active' },
    { id: 3, name: 'Wildlife Photo 3', category: 'Marine', price: 49.99, status: 'Inactive' },
  ];

  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddProduct = (product: any) => {
    // In a real implementation, this would call an API to create the product
    console.log('Adding product:', product);
    // For now, we'll just hide the form
    setShowAddForm(false);
    // In a real app, you would update the products list here
  };

  return (
    <div>
      {showAddForm ? (
        <AddProductForm
          onCancel={() => setShowAddForm(false)}
          onSubmit={handleAddProduct}
        />
      ) : (
        <>
          <div className="mb-4">
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
              onClick={() => setShowAddForm(true)}
            >
              Add Product
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">ID</th>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Category</th>
                  <th className="py-2 px-4 border-b">Price</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="py-2 px-4 border-b">{product.id}</td>
                    <td className="py-2 px-4 border-b">{product.name}</td>
                    <td className="py-2 px-4 border-b">{product.category}</td>
                    <td className="py-2 px-4 border-b">${product.price}</td>
                    <td className="py-2 px-4 border-b">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        product.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button className="text-blue-500 hover:text-blue-700 mr-2">
                        Edit
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductManagement;