"use client";

// import { Badge } from "@/components/ui/badge";
import { type ColumnDef } from "@tanstack/react-table";
import { ImageViewer } from "@/components/containers/image-viewer";
import { IApplication, IApplicationColumns } from "../../../application/type";
import { getIdentityLabel } from "src/app/(protected)/profile/lib";
// import { PrintDialog } from "./PrintDialog";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Printer } from "lucide-react";

const FullNameCell = ({ row }: IApplicationColumns) => (
  <div className="font-medium">
    {`${row.original?.profile?.firstName} ${row.original?.profile?.lastName}`}
  </div>
);

// const GenderCell = ({ row }: IApplicationColumns) => {
//   const gender = row.original?.profile.gender ?? "";
//   return (
//     <Badge
//       variant={gender === "ຊາຍ" ? "outline" : "secondary"}
//       className={`${gender === "ຊາຍ" ? "border-blue-500 text-blue-700" : "bg-pink-100 text-pink-700"}`}
//     >
//       {gender}
//     </Badge>
//   );
// };

const CompanyCell = ({ row }: IApplicationColumns) => {
  const companyName = row.original?.company?.name;
  const villageName = `${row.original?.village?.villageLao}(ບ້ານ)`;
  const company = companyName ?? villageName ?? "ຍັງບໍ່ໄດ້ລະບຸ";

  if (!company) { 
    return null; 
  }

  return (
    <div className="flex flex-col">
      <span className="font-medium overflow-hidden">{company}</span>
    </div>
  );
};

const BusinessCode = ({ row }: IApplicationColumns) => {
  const businessCode = row.original?.company?.businessCode || "-";

  if (!businessCode) { 
    return null; 
  }

  return (
    <div className="flex flex-col">
      <span className="font-medium overflow-hidden">{businessCode}</span>
    </div>
  );
};

const IdentityNumber = ({ row }: IApplicationColumns) => {
  const applicationNumber = getIdentityLabel(row.original?.profile?.applicationNumber || "");
  const profile = row.original?.profile?.applicationNumber
  if (!profile) { 
    return null; }

  return (
    <div className="flex flex-col">
      <span className="font-medium">{applicationNumber}</span>
      <span className="text-xs text-muted-foreground">{profile}</span>
    </div>
  );
};

const FolderName = ({ row }: IApplicationColumns) => {
  const folderName = row.original?.folder?.name;
  return (
    <div className="flex flex-col">
      <span className="font-medium">{folderName}</span>
    </div>
  );
};

const BillNumber = ({ row }: IApplicationColumns) => {
  const billNumber = row.original?.folder?.billNumber;
  return (
    <div className="flex flex-col">
      <span className="font-medium">{billNumber}</span>
    </div>
  );
};

export const columnsProfile = (): Array<ColumnDef<IApplication>> => [
  {
    accessorKey: "no",
    header: "ລຳດັບ",
    // cell: ({ row }) => <div className="text-start font-normal">{row.original?.profile?.id}</div>,
    cell: ({ row }) => <div className="text-start font-normal">{row.index + 1}</div>,
  },
  {
    accessorKey: "image",
    header: "ຮູບພາບ",
    cell: ({ row }) => (
      <div className="">
        <ImageViewer
          src={row.original?.profile?.image ?? ""}
          className="h-8 w-8 rounded-full object-cover border border-muted"
        />
      </div>
    ),
  },
  {
    accessorKey: "identityNumber",
    header: "ເລກທີເອກະສານ",
    cell: ({ row }) => <IdentityNumber row={row} />,
  },
  {
    accessorKey: "firstName",
    header: "ຊື່ສັດ",
    cell: ({ row }) => <FullNameCell row={row} />,
  },
  {
    accessorKey: "folderName",
    header: "ຊື່ແຟ້ມເອກະສານ",
    cell: ({ row }) => <FolderName row={row} />,
  },
  {
    accessorKey: "billNumber",
    header: "ເລກທີ່ແຟ້ມ",
    cell: ({ row }) => <BillNumber row={row} />,
  },
  {
    accessorKey: "companyId", 
    header: "ຫົວໜ່ວຍທຸລະກິດ",
    cell: ({ row }) => <CompanyCell row={row} />,
  },
  {
    accessorKey: "businessCode",
    header: "ເລກທີ່ຫົວໜ່ວຍທຸລະກິດ",
    cell: ({ row }) => <BusinessCode row={row} />,
  },
  // {
  //   accessorKey: "id",
  //   header: "ຈັດການ",
  //   cell: ({ row: { original } }) => {
  //     const frozenOriginal = Object.freeze(original);
  //     return <PrintDialog title="ພິມບັດ" application={frozenOriginal} refetch={refetch} />;
  //   },
  // },
  {
    accessorKey: "id",
    header: "ຄຳສັ່ງພິມ",
    cell: ({ row: { original } }) => {
      const printPageLink = `/printing/container/print-view/${original.id}`;
      return (
        <Link href={printPageLink} passHref>
          <Button variant="outline" size="sm">
            <Printer className="h-5 w-5" />
          </Button>
        </Link>
      );
    },
  },
];