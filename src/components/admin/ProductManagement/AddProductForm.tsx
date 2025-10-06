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

const AddProductForm: React.FC<AddProductFormProps> = ({ onCancel, onSuccess }) => {
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
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [productOptions, setProductOptions] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryData = await photoService.getCategories();
        setCategories(categoryData.map((c) => ({ value: c.id, label: c.name })));

        const mainProductData = await photoService.getAllMainProducts();
        setProductOptions(mainProductData);
      } catch (err: any) {
        setError(err.message || "Failed to load categories or products");
      }
    };
    fetchData();

    // Cleanup imagePreview URL to prevent memory leaks
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file (JPEG, PNG, GIF, etc.)");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }

      // Revoke previous preview URL to prevent memory leaks
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }

      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setError("");
    }
  };

  const validateForm = () => {
    if (!name.trim()) return "Product name is required";
    if (!sku.trim()) return "SKU is required";
    if (!price || isNaN(parseFloat(price)) || parseFloat(price) < 0) return "Valid price is required";
    if (!qtyInStock || isNaN(parseInt(qtyInStock)) || parseInt(qtyInStock) < 0) return "Valid quantity in stock is required";
    if (!categoryId) return "Category is required";
    if (!selectedProduct) return "Main product is required";
    if (!imageFile) return "Product image is required";
    if (weight && (isNaN(parseFloat(weight)) || parseFloat(weight) < 0)) return "Valid weight is required";
    if (length && (isNaN(parseFloat(length)) || parseFloat(length) < 0)) return "Valid length is required";
    if (width && (isNaN(parseFloat(width)) || parseFloat(width) < 0)) return "Valid width is required";
    if (height && (isNaN(parseFloat(height)) || parseFloat(height) < 0)) return "Valid height is required";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setUploadProgress(0);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    try {
      const productItem = {
        name,
        sku,
        description,
        price: parseFloat(price),
        weight: weight ? parseFloat(weight) : 0,
        weightUnit,
        length: length ? parseFloat(length) : 0,
        width: width ? parseFloat(width) : 0,
        height: height ? parseFloat(height) : 0,
        customizable,
        freeShipping,
        qtyInStock: parseInt(qtyInStock),
        productId: parseInt(selectedProduct),
        categoryId,
      };

      await photoService.createProductWithCloudinary(productItem, imageFile!, (progress) => {
        setUploadProgress(progress);
      });

      onSuccess();
    } catch (err: any) {
      setError(err.message || "Failed to create product");
    } finally {
      setLoading(false);
      setUploadProgress(0);
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
        {/* Basic Info */}
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-3">Basic Info</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
              className={error.includes("Product name") ? "border-red-500" : ""}
            />
            <Input
              label="SKU"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              required
              fullWidth
              className={error.includes("SKU") ? "border-red-500" : ""}
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

        {/* Pricing & Stock */}
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-3">Pricing & Stock</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Price ($)"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              fullWidth
              className={error.includes("price") ? "border-red-500" : ""}
            />
            <Input
              label="Quantity in Stock"
              type="number"
              value={qtyInStock}
              onChange={(e) => setQtyInStock(e.target.value)}
              required
              fullWidth
              className={error.includes("quantity") ? "border-red-500" : ""}
            />
          </div>
        </div>

        {/* Dimensions */}
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
                className={error.includes("weight") ? "border-red-500" : ""}
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
                className={error.includes("length") ? "border-red-500" : ""}
              />
              <Input
                label="Width"
                type="number"
                step="0.01"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className={error.includes("width") ? "border-red-500" : ""}
              />
              <Input
                label="Height"
                type="number"
                step="0.01"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className={error.includes("height") ? "border-red-500" : ""}
              />
            </div>
          </div>
        </div>

        {/* Category & Main Product */}
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-3">Classification</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              options={[{ value: "", label: "Select a category" }, ...categories]}
              required
              className={error.includes("Category") ? "border-red-500" : ""}
            />
            <Select
              label="Main Product"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              options={[{ value: "", label: "Select a product" }, ...productOptions.map((p) => ({
                value: p.id.toString(),
                label: p.name,
              }))]}
              required
              className={error.includes("Main product") ? "border-red-500" : ""}
            />
          </div>
          {productOptions.length === 0 && (
            <div className="text-sm text-red-600 mt-2">
              No main products available. Please ensure products are loaded.
            </div>
          )}
        </div>

        {/* Product Image */}
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-3">Product Image</h4>
          <div className="space-y-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={loading}
              className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50 ${
                error.includes("image") ? "border-red-500" : ""
              }`}
            />

            {loading && uploadProgress > 0 && (
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
                <div className="text-xs text-gray-600 mt-1">Uploading: {uploadProgress}%</div>
              </div>
            )}

            {imagePreview && (
              <div className="mt-3 flex items-center space-x-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded-lg border shadow-sm"
                />
                <div className="text-sm text-gray-600">
                  <div>✓ Image ready for upload</div>
                  <div>File will be stored in Cloudinary</div>
                </div>
              </div>
            )}

            {!imagePreview && (
              <div className="text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
                <strong>Cloudinary Storage:</strong> Images will be optimized and stored securely in the cloud with automatic CDN delivery.
              </div>
            )}
          </div>
        </div>

        {/* Options */}
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

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-4 border-t">
          <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={loading || productOptions.length === 0}
            className="min-w-[120px]"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Uploading...</span>
              </div>
            ) : (
              "Add Product"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;