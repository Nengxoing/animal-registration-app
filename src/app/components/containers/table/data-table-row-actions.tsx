"use client"; // Add this directive to indicate this is a client-side component

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { usePathname, useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui";
import { Button } from "../button";

interface DataTableRowActionsProps {
  rowId: number;
  resource?: string
  showEdit?: boolean;
  showDelete?: boolean
  showDetail?: boolean
  onApprove?: (id: number) => void; // <--- เพิ่ม prop สำหรับฟังก์ชัน approve
  showApprove?: boolean; // <--- เพิ่ม prop สำหรับควบคุมการแสดงผลปุ่ม
}

export function DataTableRowActions({
  rowId,
  resource,
  showEdit = true, 
  showDelete = false,
  showDetail = false,
  onApprove, // <--- รับ prop เข้ามา
  showApprove = false, // <--- กำหนดค่าเริ่มต้น
}: DataTableRowActionsProps) {
  const router = useRouter();
  const pathname = usePathname()
  const handleEdit = () => {
    router.push(`/${resource || pathname}/edit/${rowId}`);
  };

  const handleShowDetail = () => {
    router.push(`/${resource || pathname}/show/${rowId}`);
  };

  const handleDelete = () => {
  };

  const handleApprove = () => {
    if (onApprove) {
      onApprove(rowId); // เรียกใช้ฟังก์ชัน onApprove ที่ส่งมาจาก parent component
    }
  }; 

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild> 
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        {showEdit && <DropdownMenuItem onClick={handleEdit}>ແກ້ໄຂ</DropdownMenuItem>}
        {/* {showDelete && <DropdownMenuItem onClick={handleDelete}>ລຶບ</DropdownMenuItem>}
        {showDetail && <DropdownMenuItem onClick={handleShowDetail}>ລາຍລະອຽດ</DropdownMenuItem>} */}
        {showApprove && (<DropdownMenuItem onClick={handleApprove}>ອານຸມັດ</DropdownMenuItem>)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
