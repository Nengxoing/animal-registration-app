/* eslint-disable linebreak-style */
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';

interface AnimalExportPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export const AnimalExportPagination: React.FC<AnimalExportPaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-between items-center mt-6">
      <Button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
      >
        ກ່ອນໜ້າ
      </Button>
      <span className="text-gray-700">
        ໜ້າ {page} ຂອງ {totalPages}
      </span>
      <Button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
      >
        ຕໍ່ໄປ
      </Button>
    </div>
  );
};
