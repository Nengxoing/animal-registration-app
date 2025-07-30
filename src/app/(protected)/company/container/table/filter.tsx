/* eslint-disable linebreak-style */
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui";
import * as React from "react";

interface DataTableToolbarProps {
    updateSearch: (search: string) => void;
    filter?: {
        statusFilter: string;
        setStatusFilter: (filter: string) => void;
    };
}

export function DataTableToolbar({ updateSearch, filter }: DataTableToolbarProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearch(e.target.value);
  };

  const handleStatusFilterChange = (value: string) => {
    if (filter?.setStatusFilter) {
      filter.setStatusFilter(value);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          placeholder="ຄົ້ນຫາ..."
          className="h-10 w-[150px] lg:w-[250px] border border-sky-700"
          onChange={handleSearchChange}
        />
        <Select
          // value จะใช้ค่าจาก filter?.statusFilter ซึ่งเริ่มต้นจาก "0" ใน useTable
          // หรือใช้ "0" ถ้า filter?.statusFilter ไม่มีค่า (เป็น fallback)
          onValueChange={handleStatusFilterChange}
          value={filter?.statusFilter || "0"} 
        >
          <SelectTrigger className="h-10 w-[180px] border border-sky-700">
            <SelectValue placeholder="ເລືອກປະເພດລາຍການ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">ຟາມທີ່ລົງທະບຽນໃຫມ່</SelectItem>
            <SelectItem value="1">ຟາມທີ່ອານຸມັດແລ້ວ</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}