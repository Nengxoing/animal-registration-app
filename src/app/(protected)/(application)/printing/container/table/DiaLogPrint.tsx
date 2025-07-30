/* eslint-disable linebreak-style */
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { StayPermitCard } from "../card";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { IApplication } from "../../../application/type";

interface DiaLogPrintProps {
  open: boolean;
  onClose: () => void;
  application: IApplication;
}

export default function DiaLogPrint({ open, onClose, application }: DiaLogPrintProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `Application-${application.id}-Print`,
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
        }
      }
    `,
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      {/* ปรับขนาด DialogContent ให้พอดีกับหน้าจอและมี Scrollbar หากเนื้อหายาว */}
      <DialogContent className="
        fixed inset-0
        max-w-[95vw] max-h-[95vh]
        md:max-w-[80vw] md:max-h-[90vh]
        lg:max-w-[70vw] lg:max-h-[85vh]
        xl:max-w-[60vw] xl:max-h-[80vh]
        w-full h-full
        p-0 bg-white
        flex flex-col
        overflow-hidden
      ">
        {/* DialogHeader สำหรับชื่อ Dialog และปุ่มพิมพ์ */}
        <DialogHeader className="
          p-4 bg-white border-b border-gray-200
          flex flex-row items-center justify-between
          sticky top-0 z-10
        ">
          <DialogTitle className="text-lg font-semibold">ພິມເອກະສານ</DialogTitle>
          <Button onClick={handlePrint} className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            <span>ພິມ</span>
          </Button>
        </DialogHeader>

        {/* ส่วนเนื้อหาที่สามารถ Scroll ได้ */}
        <div ref={printRef} className="
          flex-1 p-8 overflow-y-auto
          print-a4-size
        ">
          <StayPermitCard application={application} />
        </div>
      </DialogContent>
    </Dialog>
  );
}