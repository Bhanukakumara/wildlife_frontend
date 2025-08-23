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

  // Note: The backend controller doesn't currently have update or delete endpoints
  // You will need to add these in the Java backend.
  // Example stubs for future implementation:
  // updateCountry: async (country: Country): Promise<Country> => {
  //   const response = await apiClient.put(`/country/update/${country.id}`, country);
  //   return response.data as Country;
  // },

  // deleteCountry: async (id: number): Promise<void> => {
  //   await apiClient.delete(`/country/delete/${id}`); // Assuming a successful deletion returns a 200 or 204
  // },
};

export default countryService;