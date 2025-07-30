/* eslint-disable linebreak-style */
"use client";

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AnimalExportFiltersProps {
  search: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AnimalExportFilters: React.FC<AnimalExportFiltersProps> = ({
  search,
  onSearchChange,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 mb-6">
      <div className='space-y-2'>
        <Label htmlFor="search mb-4">ຄົ້ນຫາ (ຊື່ແຟ້ມ, ເລກທີ່ແຟ້ມ)</Label>
        <Input
          id="search"
          type="text"
          placeholder="ຄົ້ນຫາ..."
          value={search}
          onChange={onSearchChange}
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>
    </div>
  );
};