'use client';

import { DataTableRowActions } from "@/components/containers/table/data-table-row-actions";
import { Badge } from "@/components/ui";
import { type ColumnDef } from "@tanstack/react-table";
import { type IProfile, type IProfileColumns } from "../../type";
import { BlacklistDialog } from "./blacklist";
import { getIdentityLabel } from "../../lib";
import { ImageViewer } from "@/components/containers/image-viewer";
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { RoleBasedGuard } from "@/lib/ability/roleBasedGuard";
import { useSession } from "next-auth/react";
import { IProfileGallery } from "src/app/(protected)/(image)/profileGallery/type";

const FullNameCell = ({ row }: IProfileColumns) => (
  <span>{`${row.original?.firstName}`}</span>
);

const WeightCell = ({ row }: IProfileColumns) => {
  const weight = row.original?.weight;
  return (
    <span>
      <Badge variant={"outline"} className="w-20">
        {weight} kg
      </Badge>
    </span>
  );
}
const HeightCell = ({ row }: IProfileColumns) => {
  const height = row.original?.height;
  return (
    <span>
      <Badge variant={"outline"} className="w-20">
        {height} cm
      </Badge>
    </span>
  );
}
const Age = ({ row }: IProfileColumns) => {
  const age = row.original?.age;
  return (
    <span>
      <Badge variant={"outline"} className="w-20">
        {age} ປີ
      </Badge>
    </span>
  );
}
const BreedCell = ({ row }: IProfileColumns) => {
  const breed = row.original?.breed;
  return (
    <span>
      <Badge variant={"outline"} className="w-20">
        {breed}
      </Badge>
    </span>
  );
}

const GenderCell = ({ row }: IProfileColumns) => {
  const gender = row.original?.gender ?? "";
  return (
    <Badge variant={gender === "ຊາຍ" ? "outline" : "secondary"}>{`${gender}`}</Badge>
  );
};
const ProfileId = ({ row }: IProfileColumns) => {
  const id = row.original?.id;
  return (
    <Badge variant={"outline"} className="w-20">
      {id}
    </Badge>
  );
}
const ProfileLinkCell = ({ item }: any) => {
  const router = useRouter();
  const hasProfile = item.profileGallery && item.profileGallery.length > 0;
  const pushTo = hasProfile ? `/profileGallery/edit/${item.id}` : `/profileGallery/create/0/${item.id}`;
  return (
    <div>
      <Button variant="outline" size="sm" className="h-9 w-10" onClick={() => router.push(pushTo)}>
        Link
      </Button>
    </div>
  );
};

const userRole = () => {
  const { data: session } = useSession()
  const userRole = session?.user?.role;
  const columnTitle = userRole === "ADMIN" || userRole === "SUPER_ADMIN" ? "ຂື້ນບັນຊີດໍາ" : null;
  return columnTitle;
}

export const columnsProfile: Array<ColumnDef<IProfile>> = [
  {
    accessorKey: "image",
    header: "ຮູບໃຫມ່​",
    cell: ({ row }) => {
      const profileGallery = row.original?.profileGallery as object as IProfileGallery[] || [];
      return(
        <>
          {profileGallery.length > 0 ? (
            profileGallery.map((item) => (
              <ImageViewer key={item?.id} src={item?.gallery.image} className="my-1 h-14 w-14" />
            ))
          ):(
            <ImageViewer src={row.original?.image} className="my-1 h-14 w-14" />
          )}
        </>
      )
    },
  },
  {
    accessorKey: "oldImage",
    header: "ຮູບເກົ່າ",
    cell: ({ row }) => <ImageViewer src={row.original?.oldImage} className="my-1 h-14 w-14" />,
  },
  {
    accessorKey: "firstName",
    header: "ຊື່",
    cell: ({ row }) => <FullNameCell row={row} />,
  },
  {
    accessorKey: "applicationNumber",
    header: "ເລກທີໃບຄໍາຮ້ອງ",
  },
  {
    accessorKey: "barcode",
    header: "ບາໂຄດ",
  },
  {
    accessorKey: "weight",
    header: "ນ້ຳໜັກ",
    cell: ({ row }) => <WeightCell row={row} />,
  },
  {
    accessorKey: "height",
    header: "ລວງສູງ",
    cell: ({ row }) => <HeightCell row={row} />,
  },
  {
    accessorKey: "breed",
    header: "ສາຍພັນ",
    cell: ({ row }) => <BreedCell row={row} />,
  },
  
  {
    accessorKey: "age",
    header: "ອາຍຸ",
    cell: ({ row }) => <Age row={row} />,
  },
  
  {
    accessorKey: "gender",
    header: "ເພດ",
    cell: ({ row }) => <GenderCell row={row} />,
  },
 
  {
    accessorKey: "id",
    header: "ຮູບພາບ",
    cell: ({ row }) => <ProfileLinkCell item={row.original} />,
  },
  // {
  //   accessorKey: "id",
  //   header: userRole,
  //   cell: ({ row }) => (
  //     <RoleBasedGuard subject="add-blacklist-btn" action="read" fallback={<div></div>}>
  //       <BlacklistDialog profile={row.original} />
  //     </RoleBasedGuard>
  //   ),
  // },
  
];