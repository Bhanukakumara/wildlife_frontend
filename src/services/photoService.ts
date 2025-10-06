import apiClient from "./apiClient";

export interface Photo {
  id: string;
  name: string;
  sku: string;
  description: string;
  price: number;
  weight: number;
  weightUnit: string;
  length: number;
  width: number;
  height: number;
  customizable: boolean;
  freeShipping: boolean;
  qtyInStock: number;
  productId: number;
  categoryId: string;
  imageUrl: string;
}

export interface PhotoCategory {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  photos: Photo[];
}

export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface PhotoSearchRequest {
  category?: string;
  searchTerm?: string;
  page?: number;
  size?: number;
  sort?: string;
}

class PhotoService {
  async getAllPhotos(): Promise<Photo[]> {
    try {
      const response = await apiClient.get<Photo[]>('/product-items/get-all');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch photos");
    }
  }

  async searchPhotos(params: PhotoSearchRequest): Promise<PaginatedResponse<Photo>> {
    try {
      const response = await apiClient.get<PaginatedResponse<Photo>>('/product-items/search', {
        params: {
          category: params.category,
          searchTerm: params.searchTerm,
          page: params.page,
          size: params.size,
          sort: params.sort,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to search photos");
    }
  }

  async getPhotoById(id: string): Promise<Photo> {
    try {
      const response = await apiClient.get<Photo>(`/product-items/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch photo");
    }
  }

  async getCategories(): Promise<PhotoCategory[]> {
    try {
      const response = await apiClient.get<PhotoCategory[]>('/product-categories');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch categories");
    }
  }

  async getFeaturedPhotos(limit: number = 6): Promise<Photo[]> {
    try {
      const response = await apiClient.get<Photo[]>(`/photos/featured?limit=${limit}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch featured photos");
    }
  }

  async createProductWithCloudinary(productData: any, imageFile: File, onProgress?: (progress: number) => void): Promise<Photo> {
    try {
      const formData = new FormData();
      formData.append('productItem', new Blob([JSON.stringify(productData)], { type: 'application/json' }));
      formData.append('image', imageFile);

      const response = await apiClient.post('/product-items/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onProgress?.(percentCompleted);
          }
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to create product");
    }
  }

  async getAllMainProducts(): Promise<{ id: number; name: string }[]> {
    try {
      const response = await apiClient.get<{ id: number; name: string }[]>('/products/get-all');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch main products');
    }
  }

  async deleteProduct(productItemId: string): Promise<void> {
    try {
      await apiClient.delete(`/product-items/delete/${productItemId}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete product');
    }
  }

  async uploadToCloudinary(file: File, onProgress?: (progress: number) => void): Promise<string> {
    const formData = new FormData();
    formData.append('image', file);

    const response = await apiClient.post('/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress?.(percentCompleted);
        }
      },
    });

    if (response.data.success) {
      return response.data.imageUrl;
    } else {
      throw new Error(response.data.message || 'Upload failed');
    }
  }
}

export default new PhotoService();