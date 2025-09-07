import React, { useState, useEffect } from "react";
import photoService, { type Photo } from "../../../services/photoService";
import AddProductForm from "./AddProductForm";

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const photos = await photoService.getAllPhotos();
        setProducts(photos);
      } catch (err: any) {
        setError(err.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddSuccess = async () => {
    setShowAddForm(false);
    try {
      const updatedProducts = await photoService.getAllPhotos();
      setProducts(updatedProducts);
    } catch (err: any) {
      console.error("Failed to refresh products:", err);
    }
  };

  const handleDelete = async (productId: string) => {
    try {
      await photoService.deleteProduct(productId);
      setProducts(products.filter((product) => product.id !== productId));
    } catch (err: any) {
      setError(err.message || "Failed to delete product");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-medium">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-xl p-6 transition-all">
      {showAddForm ? (
        <AddProductForm
          onCancel={() => setShowAddForm(false)}
          onSuccess={handleAddSuccess}
        />
      ) : (
        <>
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              📦 Product Management
            </h2>
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-sm transition"
              onClick={() => setShowAddForm(true)}
            >
              + Add Product
            </button>
          </div>

          {/* Empty State */}
          {products.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <p className="text-lg">No products available</p>
              <p className="text-sm">Click “Add Product” to create one</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
                    <th className="py-3 px-4 border-b">Name</th>
                    <th className="py-3 px-4 border-b">SKU</th>
                    <th className="py-3 px-4 border-b">Price</th>
                    <th className="py-3 px-4 border-b">Stock</th>
                    <th className="py-3 px-4 border-b text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.sku}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-4 border-b">{product.name}</td>
                      <td className="py-3 px-4 border-b">{product.sku}</td>
                      <td className="py-3 px-4 border-b">${product.price}</td>
                      <td className="py-3 px-4 border-b">
                        {product.qtyInStock}
                      </td>
                      <td className="py-3 px-4 border-b text-center">
                        <button className="text-blue-500 hover:text-blue-700 mr-3 font-medium">
                          Edit
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700 font-medium"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductManagement;
