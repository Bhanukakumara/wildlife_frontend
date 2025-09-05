import React, { useState, useEffect } from 'react';
import Input from '../../forms/Input/Input';
import TextArea from '../../forms/TextArea/TextArea';
import Select from '../../forms/Select/Select';
import Checkbox from '../../forms/Checkbox/Checkbox';
import Button from '../../common/Button/Button';
import photoService from '../../../services/photoService';

interface AddProductFormProps {
  onCancel: () => void;
  onSubmit: (product: any) => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onCancel, onSubmit }) => {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [customizable, setCustomizable] = useState(false);
  const [freeShipping, setFreeShipping] = useState(false);
  const [qtyInStock, setQtyInStock] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await photoService.getCategories();
        const categoryOptions = categoryData.map(category => ({
          value: category.id,
          label: category.name
        }));
        setCategories(categoryOptions);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setError('Failed to load categories');
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // In a real implementation, this would call an API to create the product
      const newProduct = {
        name,
        sku,
        description,
        price: parseFloat(price) || 0,
        weight: parseFloat(weight) || 0,
        weightUnit,
        length: parseFloat(length) || 0,
        width: parseFloat(width) || 0,
        height: parseFloat(height) || 0,
        customizable,
        freeShipping,
        qtyInStock: parseInt(qtyInStock) || 0,
        imageUrl,
        productId: categoryId ? parseInt(categoryId) : 0
      };

      // Call the onSubmit callback with the new product data
      onSubmit(newProduct);
    } catch (err) {
      setError('Failed to create product');
      console.error('Error creating product:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Add New Product</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Input
            label="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
          />
          
          <Input
            label="SKU"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            required
            fullWidth
          />
          
          <div className="md:col-span-2">
            <TextArea
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              fullWidth
            />
          </div>
          
          <Input
            label="Price ($)"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            fullWidth
          />
          
          <Input
            label="Quantity in Stock"
            type="number"
            value={qtyInStock}
            onChange={(e) => setQtyInStock(e.target.value)}
            required
            fullWidth
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Weight"
              type="number"
              step="0.01"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              fullWidth
            />
            <Select
              label="Weight Unit"
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value)}
              options={[
                { value: 'kg', label: 'kg' },
                { value: 'g', label: 'g' },
                { value: 'lb', label: 'lb' },
                { value: 'oz', label: 'oz' }
              ]}
              fullWidth
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Length"
              type="number"
              step="0.01"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              fullWidth
            />
            <Input
              label="Width"
              type="number"
              step="0.01"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              fullWidth
            />
            <Input
              label="Height"
              type="number"
              step="0.01"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              fullWidth
            />
          </div>
          
          <Select
            label="Category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            options={categories}
            fullWidth
          />
          
          <Input
            label="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            fullWidth
          />
        </div>
        
        <div className="flex items-center mb-6">
          <div className="mr-6">
            <Checkbox
              label="Customizable"
              checked={customizable}
              onChange={(e) => setCustomizable(e.target.checked)}
            />
          </div>
          <div>
            <Checkbox
              label="Free Shipping"
              checked={freeShipping}
              onChange={(e) => setFreeShipping(e.target.checked)}
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Product'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;