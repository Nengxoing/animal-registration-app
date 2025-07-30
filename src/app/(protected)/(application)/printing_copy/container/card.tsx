/* eslint-disable react/no-unknown-property */
"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IApplication } from "../../application/type";
import { formatDateString } from "./barcode";
import { cn } from "@/lib/utils";
import React from "react";

export const StayPermitCard = React.forwardRef<HTMLDivElement, { application?: IApplication; className?: string }>(
  ({ application, className }, ref) => {
    if (!application) {
      return <div className="text-center text-red-500">ບໍ່ມີຂໍ້ມູນ</div>;
    }

    const { profile, folder, company, createdAt, applicationNumber } = application;

    const getGenderLabel = (gender?: string) => {
      switch (gender?.toLowerCase()) {
        case "male":
        case "m":
          return "ຜູ້";
        case "female":
        case "f":
          return "ແມ່";
        default:
          return "ບໍ່ລະບຸ";
      }
    };

    const fullName = `${profile?.firstName || ""} ${profile?.lastName || ""}`;
    const documentNumberDisplay = applicationNumber || "ບໍ່ມີຂໍ້ມູນ";
    const companyName = company?.name || "ບໍ່ມີຂໍ້ມູນ";
    const businessCode = company?.businessCode || "ບໍ່ມີຂໍ້ມູນ";
    const genderDisplay = getGenderLabel(profile?.gender);
    const createdAtDisplay = formatDateString(createdAt);

    const folderName = folder?.name || "ບໍ່ມີຂໍ້ມູນ";
    const folderBillNumber = folder?.billNumber || "ບໍ່ມີຂໍ້ມູນ";
    
    // console.log("company:", company);

    return (
      <Card
        ref={ref}
        className={cn(
          "print:a4-container bg-white mx-auto text-black font-Phetsarath space-y-12",
          "print:border-none print:shadow-none print:rounded-none print:p-0",
          className,
        )}
        style={{ width: "210mm", minHeight: "297mm" }}
      >
        <CardHeader className="text-center space-y-2">
          <h1 className="font-bold text-xl leading-tight">ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ</h1>
          <h1 className="font-bold text-xl leading-tight">ສັນຕິພາບ ເອກະລາດ ປະຊາທິປະໄຕ ເອກະພາບ ວັດທະນາຖາວອນ</h1>
        </CardHeader>

        <CardContent>
          <main className="flex gap-12">
            <section className="flex flex-col items-center w-[120px] space-y-2">
              <div className="w-[120px] h-[150px] print:border-none border border-gray-400 flex items-center justify-center bg-gray-100">
                {profile?.image ? (
                  <Image
                    src={profile.image}
                    alt="ຮູບພາບບຸກຄົນ"
                    width={120}
                    height={150}
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <span className="text-xs text-gray-500 text-center px-2">ບໍ່ມີຮູບພາບ</span>
                )}
              </div>
              <p className="font-semibold text-sm mb-2 text-center">ຮູບພາບ</p>
            </section>
            
            <section className="flex-1 text-[14pt] leading-snug">
              <div className="mb-4">
                <strong>ຊື່</strong>
                <p className="font-TimesNewRoman uppercase">{fullName}</p>
              </div>

              <div className="mb-4">
                <strong>ເລກທີເອກະສານ:</strong>
                <p className="font-TimesNewRoman">{documentNumberDisplay}</p>
              </div>

              <div className="mb-4">
                <strong>ຫົວໜ່ວຍທຸລະກິດ:</strong>
                <p className="font-TimesNewRoman line-clamp-2">{companyName}</p>
              </div>

              <div className="mb-4">
                <strong>ເລກທີ່ຫົວໜ່ວຍທຸລະກິດ:</strong>
                <p className="font-TimesNewRoman line-clamp-2">{businessCode}</p>
              </div>

              <div className="mb-4">
                <strong>ຊື່ແຟ້ມເອກະສານ:</strong>
                <p className="font-TimesNewRoman line-clamp-2">{folderName}</p>
              </div>

              <div className="mb-4">
                <strong>ເລກທີ່ແຟ້ມ:</strong>
                <p className="font-TimesNewRoman line-clamp-2">{folderBillNumber}</p>
              </div>

              <div className="mb-4">
                <strong>ເພດ:</strong>
                <p className="font-TimesNewRoman">{genderDisplay}</p>
              </div>

              <div className="mb-4">
                <strong>ວັນທີ່ສ້າງ:</strong>
                <p className="font-TimesNewRoman">{createdAtDisplay}</p>
              </div>
            </section>
          </main>
        </CardContent>
        <style jsx>{`
          @media print {
            @page {
              size: A4;
              margin: 5mm;
            }
            .print\\:a4-container {
              width: 210mm !important;
              min-height: 297mm !important;
              box-shadow: none !important;
              margin: 0 auto !important;
              border: none !important;
              border-radius: 0 !important;
              padding: 0 !important;
            }

            .print\\:a4-container * {
              border: none !important;
              box-shadow: none !important;
              outline: none !important;
            }
          }
        `}</style>
      </Card>
    );
  },
);

StayPermitCard.displayName = 'StayPermitCard';