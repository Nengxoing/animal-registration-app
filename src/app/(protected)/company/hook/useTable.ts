/* eslint-disable linebreak-style */
/* eslint-disable no-magic-numbers */
import { apiClient } from "@/lib/axios";
import { type MetaState } from "@/lib/interface";
import { usePaginationStore, useSearchStore } from "@/lib/pagination-search";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { type ICompany } from "../type";
import { AxiosResponse } from "axios"; // <--- เพิ่ม import AxiosResponse

interface ICompanyResponse {
  result: ICompany[];
  meta: MetaState;
}

const fetchCompany = async ({ page, limit, search, statusFilter }: {
  page: number;
  limit: number;
  search: string;
  statusFilter?: string;
}): Promise<ICompanyResponse> => {
  const params: Record<string, unknown> = { page, limit, search };
  if (statusFilter !== undefined && statusFilter !== null && statusFilter !== "") {
    const statusNum = parseInt(statusFilter, 10);
    if (!isNaN(statusNum)) {
      params.status = statusNum;
    }
  }
  const response = await apiClient.get<ICompanyResponse>("/company", {
    params,
  });
  return response;
};

// ฟังก์ชันสำหรับเรียก API เพื่ออัปเดต status ของบริษัท
// แก้ไขการส่งข้อมูลใน apiClient.put และระบุ Type ของ response
const updateCompanyStatus = async (id: number, status: number): Promise<any> => {
  // เปลี่ยน { status } เป็น { data: { status } }
  // และระบุ Type ของ AxiosResponse เพื่อแก้ 'response' is of type 'unknown'.
  const response: AxiosResponse<any> = await apiClient.put(`/company/${id}`, { data: { status } });
  return response.data;
};

const useCompanyTable = () => {
  const { page, limit, updatePagination, resetPage } = usePaginationStore();
  const { search, updateSearch } = useSearchStore();
  const [statusFilter, setStatusFilter] = useState<string>("0");
  const [debouncedSearch] = useDebounce(search, 500);

  const queryClient = useQueryClient();

  const query = useQuery<ICompanyResponse, Error, ICompanyResponse, readonly unknown[]>({
    queryKey: ["companies", page, limit, debouncedSearch, statusFilter],
    queryFn: async () => await fetchCompany({ page, limit, search: debouncedSearch, statusFilter }),
    placeholderData: (previousData) => previousData,
    // ลบ onSuccess และ onError ออกจาก options ของ useQuery
  });

  // ใช้ useEffect เพื่อตรวจสอบการเปลี่ยนแปลงของ query.data และ query.error
  useEffect(() => {
    if (query.data) {
      // console.log('useCompanyTable: Data fetched/updated successfully:', query.data.result);
    }
  }, [query.data]); // จะทำงานเมื่อ query.data เปลี่ยนแปลง

  useEffect(() => {
    if (query.error) {
      // console.error('useCompanyTable: Error fetching data:', query.error);
    }
  }, [query.error]); // จะทำงานเมื่อ query.error เปลี่ยนแปลง

  const approveMutation = useMutation({
    mutationFn: (id: number) => updateCompanyStatus(id, 1),
    onSuccess: () => {
      // console.log('approveMutation: Company approved successfully. Invalidating and refetching data...');
      // ทำให้ cache ของ query "companies" ไม่ถูกต้อง เพื่อให้ดึงข้อมูลใหม่
      queryClient.invalidateQueries({ queryKey: ['companies'] }); // <--- เพิ่มบรรทัดนี้
      // query.refetch(); // บรรทัดนี้อาจไม่จำเป็นแล้วเมื่อใช้ invalidateQueries แต่ก็ไม่เสียหายที่จะคงไว้
    },
    // onError: (error) => {
    //   console.error("Error approving company:", error);
    // },
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
      statusFilter,
      setStatusFilter,
    },
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    updatePagination,
    updateSearch: (newSearch: string) => {
      updateSearch(newSearch);
      resetPage();
    },
    refetch: query.refetch,
    approveCompany: approveMutation.mutate,
  };
};

export default useCompanyTable;
