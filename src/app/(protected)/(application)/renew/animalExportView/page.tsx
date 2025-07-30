/* eslint-disable linebreak-style */
"use client";

import React, { useState } from 'react';
import { useAnimalExports } from './hooks/useAnimalExports';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { AnimalExportFilters } from './components/AnimalExportFilters';
// import { AnimalExportPagination } from './components/AnimalExportPagination';
import { AnimalExportTable } from './table/AnimalExportTable';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui';

export default function AnimalExportViewPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const ITEMS_PER_PAGE = 10;

  const { data, isLoading, isError, error } = useAnimalExports({
    page,
    limit: ITEMS_PER_PAGE,
    search,
  });

  const animalExports = data?.result || [];
  // const totalCount = data?.totalCount || 0;
  // const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const handleBack = () => {
    router.back();
  };

  // const handlePageChange = (newPage: number) => {
  //   if (newPage > 0 && newPage <= totalPages) {
  //     setPage(newPage);
  //   }
  // };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner show size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center min-h-screen flex items-center justify-center">
        ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນ: {error?.message || 'Unknown error'}
      </div>
    );
  }

  return (
    <div className="container mx-auto bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">ລາຍການສົ່ງອອກສັດ</h1>
        <Button
          onClick={handleBack}
          className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-md"
        >
          ກັບຄືນ
        </Button>
      </div>

      <div>
        <AnimalExportFilters
          search={search}
          onSearchChange={handleSearchChange}
        />
      </div>
      
      <div className='space-y-2'>
        <Label>ລາຍການສົ່ງອອກສັດ</Label>
        <AnimalExportTable
          animalExports={animalExports}
        />
      </div>
    </div>
  );
}
