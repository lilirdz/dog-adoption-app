
import axios from 'axios';
axios.defaults.withCredentials = true;

const API_BASE_URL = 'https://frontend-take-home-service.fetch.com';

export interface Dog {
    id: string;
    name: string;
    breed: string;
    age: number;
    img: string;
    zip_code: string;
  }
  
  export interface SearchDogsParams {
    breeds?: string[];
    zipCodes?: string[];
    ageMin?: number;
    ageMax?: number;
    size?: number;
    from?: string;
    sort?: string;
  }

  export interface SearchDogsResponse {
    resultIds: string[];
    total: number;
    next?: string;
    prev?: string;
  }

  export interface Match {
    match: string;
  }
  

export const api = {

    postAuthLogin : async (name: string, email: string): Promise<void> => {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, { name, email });
        return response.data;
    },

    postAuthLogout: async (): Promise<void> => {
        const response = await axios.post(`${API_BASE_URL}/auth/logout`);
        return response.data;
    },
    
    getDogBreeds: async (): Promise<string[]> => {
        const response = await axios.get(`${API_BASE_URL}/dogs/breeds`);
        return response.data;
    },

    searchDogs: async (params: SearchDogsParams = {}): Promise<SearchDogsResponse> => {
        const response = await axios.get<SearchDogsResponse>(`${API_BASE_URL}/dogs/search`, { params });
        return response.data;
    },

    getDogs: async (dogIds: string[]): Promise<Dog[]> => {
      const response = await axios.post<Dog[]>(`${API_BASE_URL}/dogs`, dogIds);
      return response.data;
    },

    postDogMatch: async (dogIds: string[]): Promise<Match> => {
        const response = await axios.post(`${API_BASE_URL}/dogs/match`, dogIds );
        return response.data;
    },

    fetchNextPage: async (nextCursor: string): Promise<SearchDogsResponse> => {
        const response = await axios.get<SearchDogsResponse>(`${API_BASE_URL}${nextCursor}`);
        return response.data;
    },

    fetchPrevPage: async (prevCursor: string): Promise<SearchDogsResponse> => {
        const response = await axios.get<SearchDogsResponse>(`${API_BASE_URL}${prevCursor}`);
        return response.data;
    },
}