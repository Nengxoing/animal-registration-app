/* eslint-disable linebreak-style */
/* eslint-disable max-nested-callbacks */
/* eslint-disable max-statements-per-line */
/* eslint-disable one-var-declaration-per-line */
/* eslint-disable curly */
"use client";

import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { AnimalExportItem } from "../types/application";
import { Printer } from "lucide-react";

interface AnimalExportTableProps {
  animalExports: AnimalExportItem[];
}

export const AnimalExportTable: React.FC<AnimalExportTableProps> = ({
  animalExports,
}) => {
  const handlePrintRow = (row: AnimalExportItem) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const content = `
      <html>
        <head>
          <title>Print Export Row</title>
          <style>
            body {
              font-family: 'Phetsarath OT', sans-serif;
              padding: 20px;
              // line-height: 1.6;
            }
            .a4-container {
              width: 210mm;
              // min-height: 297mm;
              padding: 20mm;
              background: white;
              line-height: 30px;
              display: flex;
              justify-content: space-around;
            }
            .label { font-weight: bold; margin-right: 5px; }
            .title {
              text-align: center;
              font-weight: bold;
              margin-bottom: 20px;
            }
            .la {
              text-align: center;    
              margin-bottom: 20px;
            }
          </style>
        </head>
        <body>
          <div class="">
            <div class="la">
              <p>ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ</p>
              <p>ສັນຕິພາບ ເອກະລາດ ປະຊາທິປະໄຕ ເອກະພາບ ວັດທະນາຖາວອນ</p>
            </div>
            <h2 class="title">ຟອມສົ່ງອອກສັດ</h2>
            <div class="a4-container">
              <div className="item">
                <div><span class="label">ຊື່ຟາມ:</span> ${row.folder?.company?.name ?? "-"}</div>
                <div><span class="label">ເລກທີ່ທຸລະກິດ:</span> ${row.folder?.company?.businessCode ?? "-"}</div>
                <div><span class="label">ຊື່ແຟ້ມ:</span> ${row.folder?.name ?? "-"}</div>
                <div><span class="label">ເລກທີ່ແຟ້ມ:</span> ${row.folder?.billNumber ?? "-"}</div>
                <div><span class="label">ຈຳນວນສັດທັງໝົດ:</span> ${row.animalQuantity}</div>
              </div>
              <div className="item">
                <div><span class="label">ຈຳນວນສັດທີ່ສົ່ງອອກ:</span> ${row.animalForSend}</div>
                <div><span class="label">ສະຖານະ:</span> ${row.status}</div>
                <div><span class="label">ວັນທີ່ສົ່ງອອກ:</span> ${new Date(row.exportDate).toLocaleDateString()}</div>
                <div><span class="label">ວັນທີ່ສ້າງ:</span> ${new Date(row.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const columns: ColumnDef<AnimalExportItem>[] = [
    {
      header: "ລຳດັບ",
      cell: ({ row }) => row.index + 1,
    },
    {
      header: "ຊື່ຟາມ",
      accessorFn: (row) => row.folder?.company?.name ?? "-",
    },
    {
      header: "ເລກທີ່ຟາມ",
      accessorFn: (row) => row.folder?.company?.businessCode ?? "-",
    },
    {
      header: "ລະຫັດແຟ້ມ",
      accessorKey: "folderId",
    },
    {
      header: "ຊື່ແຟ້ມ",
      accessorFn: (row) => row.folder?.name ?? "-",
    },
    {
      header: "ເລກທີ່ແຟ້ມ",
      accessorFn: (row) => row.folder?.billNumber ?? "-",
    },
    {
      header: "ຈຳນວນສັດທັງໝົດ",
      accessorKey: "animalQuantity",
    },
    {
      header: "ຈຳນວນສັດທີ່ສົ່ງອອກ",
      accessorKey: "animalForSend",
    },
    // {
    //   header: "ສະຖານະ",
    //   accessorKey: "status",
    //   cell: ({ getValue }) => {
    //     const status = getValue() as string;
    //     let bg = "", text = "";
    //     if (status === "APPROVED") {
    //       bg = "bg-green-100"; text = "text-green-800";
    //     } else if (status === "PENDING") {
    //       bg = "bg-yellow-100"; text = "text-yellow-800";
    //     } else if (status === "REJECTED") {
    //       bg = "bg-red-100"; text = "text-red-800";
    //     }
    //     return (
    //       <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${bg} ${text}`}>
    //         {status}
    //       </span>
    //     );
    //   },
    // },
    {
      header: "ວັນທີ່ສ້າງ",
      accessorFn: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      header: "ວັນທີ່ສົ່ງອອກ",
      accessorFn: (row) => new Date(row.exportDate).toLocaleDateString(),
    },
    {
      header: "ຈັດການ",
      cell: ({ row }) => (
        <button
          onClick={() => handlePrintRow(row.original)}
          className="text-blue-600 hover:text-blue-900"
          title="ພິມ"
        >
          <Printer className="w-5 h-5" />
        </button>
      ),
    },
  ];

  const table = useReactTable({
    data: animalExports,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center p-4 text-sm text-gray-500">
                ບໍ່ພົບຂໍ້ມູນການສົ່ງອອກສັດ.
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
