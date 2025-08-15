import apiClient from './apiClient';

export interface Photo {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
  photographer: string;
  dateTaken: string;
}

export interface PhotoCategory {
  id: string;
  name: string;
  description: string;
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
  async getPhotos(searchRequest: PhotoSearchRequest = {}): Promise<PaginatedResponse<Photo>> {
    try {
      const params = new URLSearchParams();
      
      if (searchRequest.category) {
        params.append('category', searchRequest.category);
      }
      
      if (searchRequest.searchTerm) {
        params.append('searchTerm', searchRequest.searchTerm);
      }
      
      if (searchRequest.page !== undefined) {
        params.append('page', searchRequest.page.toString());
      }
      
      if (searchRequest.size !== undefined) {
        params.append('size', searchRequest.size.toString());
      }
      
      if (searchRequest.sort) {
        params.append('sort', searchRequest.sort);
      }
      
      const response = await apiClient.get<PaginatedResponse<Photo>>(`/photos?${params.toString()}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch photos');
    }
  }

  async getPhotoById(id: string): Promise<Photo> {
    try {
      const response = await apiClient.get<Photo>(`/photos/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch photo');
    }
  }

  async getCategories(): Promise<PhotoCategory[]> {
    try {
      const response = await apiClient.get<PhotoCategory[]>('/photos/categories');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch categories');
    }
  }

  async getFeaturedPhotos(limit: number = 6): Promise<Photo[]> {
    try {
      const response = await apiClient.get<Photo[]>(`/photos/featured?limit=${limit}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch featured photos');
    }
  }
}

export default new PhotoService();