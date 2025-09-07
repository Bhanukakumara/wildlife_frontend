import React, { useState, useEffect } from "react";
import Input from "../../forms/Input/Input";
import TextArea from "../../forms/TextArea/TextArea";
import Select from "../../forms/Select/Select";
import Checkbox from "../../forms/Checkbox/Checkbox";
import Button from "../../common/Button/Button";
import photoService from "../../../services/photoService";

interface AddProductFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({
  onCancel,
  onSuccess,
}) => {
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [customizable, setCustomizable] = useState(false);
  const [freeShipping, setFreeShipping] = useState(false);
  const [qtyInStock, setQtyInStock] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [productOptions, setProductOptions] = useState<
    { id: number; name: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryData = await photoService.getCategories();
        setCategories(
          categoryData.map((c) => ({ value: c.id, label: c.name }))
        );

        const mainProductData = await photoService.getAllMainProducts();
        setProductOptions(
          mainProductData.map((p) => ({ id: p.id, name: p.name }))
        );
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load categories or products");
      }
    };
    fetchData();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const productItem = {
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
        productId: selectedProduct ? parseInt(selectedProduct) : 1,
        categoryId,
      };

      const formData = new FormData();
      formData.append(
        "productItem",
        new Blob([JSON.stringify(productItem)], { type: "application/json" })
      );
      if (imageFile) formData.append("image", imageFile);

      await photoService.createProduct(formData);
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 transition-all">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-3">
        ➕ Add New Product
      </h3>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* --- Basic Info --- */}
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-3">Basic Info</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <TextArea
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              fullWidth
              className="md:col-span-2"
            />
          </div>
        </div>

        {/* --- Pricing & Stock --- */}
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-3">
            Pricing & Stock
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>
        </div>

        {/* --- Dimensions --- */}
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-3">Dimensions</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Weight"
                type="number"
                step="0.01"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <Select
                label="Weight Unit"
                value={weightUnit}
                onChange={(e) => setWeightUnit(e.target.value)}
                options={[
                  { value: "kg", label: "kg" },
                  { value: "g", label: "g" },
                  { value: "lb", label: "lb" },
                  { value: "oz", label: "oz" },
                ]}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Input
                label="Length"
                type="number"
                step="0.01"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
              <Input
                label="Width"
                type="number"
                step="0.01"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
              />
              <Input
                label="Height"
                type="number"
                step="0.01"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* --- Category & Main Product --- */}
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-3">
            Classification
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              options={categories}
            />
            <Select
              label="Main Product"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              options={productOptions.map((p) => ({
                value: p.id.toString(),
                label: p.name,
              }))}
            />
          </div>
        </div>

        {/* --- Image Upload --- */}
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-3">
            Product Image
          </h4>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {imagePreview && (
            <div className="mt-3">
              <img
                src={imagePreview}
                alt="Preview"
                className="h-32 w-32 object-cover rounded-lg border shadow-sm"
              />
            </div>
          )}
        </div>

        {/* --- Options --- */}
        <div className="flex items-center gap-6">
          <Checkbox
            label="Customizable"
            checked={customizable}
            onChange={(e) => setCustomizable(e.target.checked)}
          />
          <Checkbox
            label="Free Shipping"
            checked={freeShipping}
            onChange={(e) => setFreeShipping(e.target.checked)}
          />
        </div>

        {/* --- Buttons --- */}
        <div className="flex justify-end gap-4">
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
            disabled={loading || !imageFile}
          >
            {loading ? "Adding..." : "Add Product"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
