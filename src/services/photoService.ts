import apiClient from "./apiClient";

export interface Photo {
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
  imageUrl: string;
  productId: number;
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
  // async getPhotos(searchRequest: PhotoSearchRequest = {}): Promise<PaginatedResponse<Photo>> {
  //   try {
  //     const params = new URLSearchParams();

  //     if (searchRequest.category) {
  //       params.append('category', searchRequest.category);
  //     }

  //     if (searchRequest.searchTerm) {
  //       params.append('searchTerm', searchRequest.searchTerm);
  //     }

  //     if (searchRequest.page !== undefined) {
  //       params.append('page', searchRequest.page.toString());
  //     }

  //     if (searchRequest.size !== undefined) {
  //       params.append('size', searchRequest.size.toString());
  //     }

  //     if (searchRequest.sort) {
  //       params.append('sort', searchRequest.sort);
  //     }

  //     const response = await apiClient.get<PaginatedResponse<Photo>>(`/photos?${params.toString()}`);
  //     return response.data;
  //   } catch (error: any) {
  //     throw new Error(error.response?.data?.message || 'Failed to fetch photos');
  //   }
  // }

  async getAllPhotos(): Promise<Photo[]> {
    try {
      const response = await apiClient.get<Photo[]>(
        "http://localhost:8080/api/product-items/get-all"
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch photos"
      );
    }
  }

  async getPhotoById(id: string): Promise<Photo> {
    try {
      const response = await apiClient.get<Photo>(`http://localhost:8080/api/product-items/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch photo");
    }
  }

  async getCategories(): Promise<PhotoCategory[]> {
    try {
      const response = await apiClient.get<PhotoCategory[]>(
        "http://localhost:8080/api/product-categories"
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch categories"
      );
    }
  }

  async getFeaturedPhotos(limit: number = 6): Promise<Photo[]> {
    try {
      const response = await apiClient.get<Photo[]>(
        `/photos/featured?limit=${limit}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch featured photos"
      );
    }
  }

  async createProduct(productData: Photo): Promise<Photo> {
    try {
      const response = await apiClient.post<Photo>('/product-items/create', productData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create product');
    }
  }

  async getAllMainProducts(): Promise<{id: number; name: string}[]> {
    try {
      const response = await apiClient.get<{id: number; name: string}[]>('http://localhost:8080/api/products/get-all');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch main products');
    }
  }
}

export default new PhotoService();
