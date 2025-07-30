"use client";

import { TitleLabel } from "@/components/containers/headerLabel";
import { DataTable } from "@/components/containers/table/data-table";
import { DataTableToolbar } from "../../blacklist/filter";
import { columnsProfile } from "./container/table/columns";
import useApplicationTable from "./useTable";
import { getOfficeIds } from "@/lib/getSession";
import { useEffect } from "react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui";

export default function ProductionPage() {
  const officeListIds = getOfficeIds()
  const { result, meta, updatePagination, updateSearch, filter, refetch, loading } = useApplicationTable({ officeIds: officeListIds });
  const updatedColumns = columnsProfile({ refetch });
  useEffect(() => {
    updateSearch("");
    filter.setDateFilter(undefined);
    filter.setYearFilter("")  
    filter.setGenderFilter("")
  }, []);
  return ( 
    <div className="pl-4 space-y-2">
      <div className="flex justify-between items-center">
        <TitleLabel title='ຄຸ້ມຄອງພິມບັດ' subtitle='ນີ້ແມ່ນລາຍການຂໍ້ມູນພິມບັດ 10-50 ລາຍການຫຼ້າສຸດ' />
      </div>
      <div className="space-y-4">
        <div className="flex justify-between">
          <DataTableToolbar updateSearch={updateSearch} filter={filter} />
          <Select>
            <SelectTrigger className="border w-60 bg-white">
              <SelectValue placeholder="ເລືອກປະເພດເອກະສານ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ANIMAL_IN">
                ປະເພດສັດນຳເຂົ້າ
              </SelectItem>
              <SelectItem value="ANIMAL_OUT">
                ປະເພດສັດສົ່ງອອກ
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DataTable columns={updatedColumns} data={result} meta={meta} updatePagination={updatePagination} loading={loading} />
      </div>
    </div>
  );
}