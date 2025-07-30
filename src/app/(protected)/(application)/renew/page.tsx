"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import useProfileBarcode from "./hook";
import ProfileGrid from "../../profile/container/card/profile-grid";
import { Button } from "@/components/ui";
import { useRouter } from "next/navigation";

export default function SearchProfiles() {
  const [barcode, setBarcode] = useState<string | undefined>(undefined);
  const { result, updateSearch, filter, loading } = useProfileBarcode();

  const extractRealBarcode = (value: string): number | undefined => {
    if(!value) {
      return undefined;
    }
    const length = value.length;
    if (length >= 7) {
      const startIndex = length - 7;
      const sliced = value.slice(startIndex);
      return Number(sliced);
    }
    return Number(value);
  };

  useEffect(() => {
    updateSearch("");
    filter.setBarcodeFilter("")
  }, []);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearch(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setBarcode(value);
    const extracted = extractRealBarcode(value);
    if (extracted) {
      filter.setBarcodeFilter(String(extracted));
    }
  }; 

  const router = useRouter();

  const handleAnimalExportView = () => {
    router.push(`/renew/animalExportView`);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>ຄົ້ນຫາລາຍຊື່ຟາມທີ່ຕ້ອງການນຳສັດອອກ</CardTitle>
              <CardDescription>ປ້ອນຂໍ້ມູນທີ່ຕ້ອງການເພື່ອຄົ້ນຫາຂໍ້ມູນ.</CardDescription>
              <p className="text-red-600 text-sm">Barcode for test system 1038280</p>
            </div>
            <Button
              className="bg-white text-gray-700 border border-gray-500 hover:bg-gray-100"
              onClick={handleAnimalExportView}
            >
              ລາຍການສົ່ງອອກ
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="barcode">ບາໂຄດ</Label>
              <Input
                placeholder="ຄົ້ນຫາບາໂຄດ..." 
                type="number"
                value={barcode || ""}
                onChange={handleFilterChange}
                autoFocus
              />
            </div>
            <div className="">
              <Label htmlFor="barcode">ຄົ້ນຫາດ້ວຍຊື່ ຫຼື ນາມສະກຸນ ຫຼື ເລກທີເອກະສານ</Label>
              <Input
                placeholder="ຄົ້ນຫາດ້ວຍຊື່ ຫຼື ນາມສະກຸນ ຫຼື ເລກທີເອກະສານ"
                type="text"
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {result?.map((item) => (
            <ProfileGrid key={item?.no} data={[item]} renewable={true} />
          ))}
        </div>
      )}
    </div>
  );
}
