/* eslint-disable no-magic-numbers */
import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { type IProfile } from "../type";
import { usePaginationStore, useSearchStore } from "./pagination-search";
import { AxiosError } from "axios";

interface IProfileResponse {
  result: IProfile[];
  meta: MetaState;
}

const fetchProfile = async ({
  page,
  limit,
  search,
  excludeApplications,
  genderFilter,
  yearFilter,
  dateFilter,
}: {
  page: number;
  limit: number;
  search: string;
  excludeApplications: boolean;
  genderFilter?: string;
  yearFilter: string;
  dateFilter?: Date;
}): Promise<IProfileResponse> => {
  const params: Record<string, unknown> = {
    page,
    limit,
    search,
    excludeApplications,
  };

  if (genderFilter) { params.gender = genderFilter; }
  if (yearFilter) { params.year = yearFilter; }
  if (dateFilter) { params.date = dateFilter; }

  const response = await apiClient.get<IProfileResponse>("/profile", { params });

  console.log("🚀 Params sent to backend:", params);
  // console.log("✅ Response from backend:", response.data);

  return response; // ✅ important!
};

const useProfileTable = ({ excludeApplications = false }: { excludeApplications?: boolean}) => {
  const { page, limit, updatePagination, resetPage } = usePaginationStore();
  const { search, updateSearch } = useSearchStore();
  const [genderFilter, setGenderFilter] = useState<string>("");
  const [yearFilter, setYearFilter] = useState<string>("")
  const [dateFilter, setDateFilter] = useState<Date | undefined>()
  const [debouncedSearch] = useDebounce(search, 500);
  // const [searchTriggered, setSearchTriggered] = useState(false);
  const query = useQuery<IProfileResponse, Error>({
    queryKey: ["profiles", page, limit, debouncedSearch, excludeApplications, genderFilter, dateFilter, yearFilter],
    queryFn: async () => await fetchProfile({ page, limit, search: debouncedSearch, excludeApplications, genderFilter, yearFilter, dateFilter }),
    placeholderData: (previousData) => previousData,
    enabled: true,
    retry: (failureCount, error) => {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status;
      return failureCount < 3 && status === 429;
    },
    retryDelay: (attempt) => attempt * 2000,

  });
  return {
    result: query.data?.result || [],
    meta: {
      ...query.data?.meta,
      currentPage: page,
      limit,
      totalCount: query.data?.meta?.totalCount || 0,
    },
    filter: {
      genderFilter,
      setGenderFilter,
      yearFilter,
      setYearFilter,
      dateFilter,
      setDateFilter,
    },
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    updatePagination,
    updateSearch: (newSearch: string) => {
      updateSearch(newSearch);
      resetPage();
      // setSearchTriggered(true);
    },
    refetch: query.refetch,
  };
};

export default useProfileTable;
