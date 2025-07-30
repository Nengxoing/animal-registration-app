/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable curly */
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/axios';
import { AnimalExportServiceResponse } from '../types/application';

interface AnimalExportsQueryParams {
    page?: number;
    limit?: number;
    search?: string; // เหลือแค่ search
}

const fetchAllAnimalExports = async (params: AnimalExportsQueryParams): Promise<AnimalExportServiceResponse> => {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.search) queryParams.append('search', params.search); // ยังคงส่ง search

    const response = await apiClient.get<AnimalExportServiceResponse>(`/folder/animal-exports?${queryParams.toString()}`);

    if (response.status !== "ok" && response.status !== "success") {
        throw new Error(response.message || "Failed to fetch animal exports");
    }
    return response;
};

export const useAnimalExports = (params: AnimalExportsQueryParams = {}) => {
    return useQuery<AnimalExportServiceResponse, Error>({
        queryKey: ['animalExports', params],
        queryFn: () => fetchAllAnimalExports(params),
    });
};
