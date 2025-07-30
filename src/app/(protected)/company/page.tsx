/* eslint-disable linebreak-style */
"use client";

import { AggregationCard } from "@/components/containers/aggregation-card";
import { DataTable } from "@/components/containers/table/data-table";

import { CreateButton } from "@/components/containers/create-button";
import { TitleLabel } from "@/components/containers/headerLabel";
import { Building2 } from "lucide-react";
import { columnsCompany } from "./container/table/columns";
import { DataTableToolbar } from "./container/table/filter";
import { useCompanyAggregation } from "./hook/useAggregation";
import useCompanyTable from "./hook/useTable"; // ตรวจสอบว่า import useCompanyTable มาแล้ว

export default function CompanyList() {
  // เพิ่ม approveCompany และ refetch จาก useCompanyTable hook
  const { result, meta, updatePagination, updateSearch, filter, loading, approveCompany } = useCompanyTable();

  const { result: aggregation } = useCompanyAggregation();

  // เพิ่ม console.log เพื่อดูว่า result ที่ส่งไป DataTable มีการเปลี่ยนแปลงหรือไม่
  // console.log('CompanyList: Result data for DataTable:', result);

  const handleApprove = async (id: number) => {
    try {
      // console.log(`CompanyList: Attempting to approve company ID: ${id}`);
      await approveCompany(id);
      // refetch(); // ไม่จำเป็นต้องเรียก refetch() ตรงนี้อีก เพราะ useMutation.onSuccess จัดการแล้ว
      // console.log(`CompanyList: Company with ID ${id} approved successfully!`);
    } catch (error) {
      console.error("CompanyList: Failed to approve company:", error);
    }
  };

  return (
    <div className="pl-4 space-y-6">
      <div className="flex justify-between items-start">
        <TitleLabel title='ຄຸ້ມຄອງຫົວໜ່ວຍທຸລະກິດ' subtitle='ນີ້ແມ່ນລາຍການຂໍ້ມູນຫົວໜ່ວຍທຸລະກິດ 10-50 ລາຍການຫຼ້າສຸດ!' />
        <CreateButton resouce="company" title='ສ້າງຟາມໃຫມ່' />
      </div>
      <div className="flex justify-between items-end w-full">
        <AggregationCard value={aggregation?.total ?? 0} title="ຫົວໜ່ວຍທຸລະກິດທັງໝົດ" icon={<Building2 />} label='ຫົວໜ່ວຍທຸລະກິດ' />
        <DataTableToolbar updateSearch={updateSearch} filter={filter} />
      </div>
      <div className="space-y-4">
        <DataTable
          columns={columnsCompany}
          data={result}
          meta={meta}
          updatePagination={updatePagination}
          loading={loading}
          onApprove={handleApprove} // <--- ส่งฟังก์ชัน handleApprove ไปยัง DataTable
        />
      </div>
    </div>
  );
}
