/* eslint-disable no-nested-ternary */
/* eslint-disable max-statements-per-line */
import { SelectAllCheckbox, SelectRowCheckbox } from "@/components/containers/column";
import { DataTableRowActions } from "@/components/containers/table/data-table-row-actions";
import { Badge } from "@/components/ui";
import { formatDate } from "@/lib/format-date";
import { type ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { type IBlacklist, type IBlacklistColumns } from "./type";

const FullNameCell = ({ row }: { row: IBlacklistColumns["row"] }) => {
  const company = row.original?.company;
  return <span>{`${company?.name }`}</span>;
};

const ReasonCell = ({ row }: IBlacklistColumns) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 20;
  const reason = row?.original?.reason || "";
  const toggleExpand = () => { setIsExpanded((prev) => !prev); };
  const displayedReason = isExpanded
    ? reason
    : reason.length > maxLength
      ? `${reason.slice(0, maxLength)}...`
      : reason;

  return (
    <div>
      <p className="font-semibold text-sm text-muted-foreground max-w-[200px] break-words">
        {displayedReason}
      </p>
      {reason.length > maxLength && (
        <button
          className="text-blue-500 text-xs font-medium underline ml-1"
          onClick={toggleExpand}
        >
          {isExpanded ? "ສະແດງນ້ອຍລົງ" : "ອ່ານເພີ່ມເຕີມ"}
        </button>
      )}
    </div>
  );
};

export const columnsBlacklistCompany: Array<ColumnDef<IBlacklist>> = [
  {
    id: "select",
    header: ({ table }) => <SelectAllCheckbox table={table} />,
    cell: ({ row }) => <SelectRowCheckbox row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "ຊື່ ບໍລິສັດ",
    accessorKey: "company.name", // or use custom cell if needed
    cell: ({ row }) => <span>{row.original.company?.name || "-"}</span>,
  },
  {
    header: "ເຫດຜົນ",
    accessorKey: "reason",
    cell: ({ row }) => <ReasonCell row={row} />,
  },
  {
    header: "ລະຫັດທຸລະກິດ", // businessCode
    cell: ({ row }) => <span>{row.original.company?.businessCode || "-"}</span>,
  },
  {
    header: "ປະເພດທຸລະກິດ", // businessType
    cell: ({ row }) => <span>{row.original.company?.businessType || "-"}</span>,
  },
  {
    header: "ວັນທີຂື້ນບັນຊີດໍາ",
    accessorKey: "updatedAt",
    cell: ({ row }) => {
      const date = row.original.updatedAt;
      return <span>{formatDate({ date })}</span>;
    },
  },
  {
    header: "",
    accessorKey: "id",
    cell: ({ row }) => {
      return <DataTableRowActions rowId={row.original.id} resource="company" />;
    },
  },

];
