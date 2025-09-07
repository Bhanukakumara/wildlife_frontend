import React, { useState, useEffect } from 'react';
import photoService, { type Photo } from '../../../services/photoService';
import AddProductForm from './AddProductForm';

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
        setError(err.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddSuccess = async () => {
    setShowAddForm(false);
    // Refresh the products list
    try {
      const updatedProducts = await photoService.getAllPhotos();
      setProducts(updatedProducts);
    } catch (err: any) {
      console.error('Failed to refresh products:', err);
    }
  };

  const handleDelete = async (productId: string) => {
    try {
      await photoService.deleteProduct(productId);
      // Remove the deleted product from the state
      setProducts(products.filter(product => product.id !== productId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete product');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      {showAddForm ? (
        <AddProductForm
          onCancel={() => setShowAddForm(false)}
          onSuccess={handleAddSuccess}
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
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">SKU</th>
                  <th className="py-2 px-4 border-b">Price</th>
                  <th className="py-2 px-4 border-b">Stock</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.sku}>
                    <td className="py-2 px-4 border-b">{product.name}</td>
                    <td className="py-2 px-4 border-b">{product.sku}</td>
                    <td className="py-2 px-4 border-b">${product.price}</td>
                    <td className="py-2 px-4 border-b">{product.qtyInStock}</td>
                    <td className="py-2 px-4 border-b">
                      <button className="text-blue-500 hover:text-blue-700 mr-2">
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
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
        </>
      )}
    </div>
  );
};

export default ProductManagement;
