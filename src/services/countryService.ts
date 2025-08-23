import apiClient from './apiClient';

interface Country {
  id?: number;
  name: string;
  countryCode: string;
}

const countryService = {
  getAllCountries: async (): Promise<Country[]> => {
    const response = await apiClient.get('/country/get-all');
    return response.data;
  },

  createCountry: async (country: Country): Promise<Country> => {
    const response = await apiClient.post('/country/create', country);
    return response.data;
  },

  updateCountry: async (id: number, country: Country): Promise<Country> => {
    const response = await apiClient.put(`/country/update/${id}`, country);
    return response.data;
  },

  deleteCountry: async (id: number): Promise<void> => {
    await apiClient.delete(`/country/delete/${id}`);
  },
};

export default countryService;