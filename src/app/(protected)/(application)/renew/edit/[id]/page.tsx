/* eslint-disable linebreak-style */
"use client";

import { Spinner } from "@/components/ui/spinner";
import { useEditApplication } from "../hooks/useEditApplication";
import { EditApplicationForm } from "../components/EditApplicationForm";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { IApplication } from "../types/application";
import React, { useState } from 'react'; // Import useState
import MessageModal from "../components/MessageModal";

interface AnimalExportPayload {
  folderId: number;
  animalQuantity: number;
  animalForSend: number;
}

interface AnimalExportResponse {
  status: string;
  message: string;
  result: any;
}

const createAnimalExportApi = async (payload: AnimalExportPayload): Promise<AnimalExportResponse> => {
  const response = await apiClient.post<AnimalExportResponse>('/folder/export-animal', { data: payload });
  return response;
};

export default function EditApplicationPage() {
  const {
    application,
    folders,
    isLoading,
    isError,
    register,
    control,
    setValue,
    watch,
    handleSubmit,
  } = useEditApplication();

  // State สำหรับจัดการ Pop-up
  const [modalState, setModalState] = useState<{
    show: boolean;
    title: string;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({
    show: false,
    title: '',
    message: '',
    type: 'info',
  });

  const closeModal = () => { 
    setModalState({ ...modalState, show: false });
  };

  const animalExportMutation = useMutation<AnimalExportResponse, Error, AnimalExportPayload>({
    mutationFn: createAnimalExportApi,
    onSuccess: (data) => {
      // console.log('ສົ່ງອອກສັດສຳເລັດ:', data);
      setModalState({
        show: true,
        title: 'ສຳເລັດ!',
        message: data.message || 'ການສົ່ງອອກສຳເລັດແລ້ວ.',
        type: 'success',
      });
    },
    onError: (error) => {
      // console.error('ເກີດຂໍ້ຜິດພາດໃນການສົ່ງອອກສັດ:', error);
      setModalState({
        show: true,
        title: 'ເກີດຂໍ້ຜິດພາດ!',
        message: error.message || 'ເກີດຂໍ້ຜິດພາດໃນລະຫວ່າງການສົ່ງອອກ.',
        type: 'error',
      });
    },
  });

  const handleFormSubmit = (formData: IApplication) => {
    const selectedFolderOption = folders?.find(
      (f) => f.folder.billNumber === formData.selectedBillNumber,
    );
    const folderId = selectedFolderOption?.folderId;

    if (!folderId) {
      setModalState({
        show: true,
        title: 'ຂໍ້ມູນບໍ່ຄົບຖ້ວນ',
        message: 'ກະລຸນາເລືອກແຟ້ມເອກະສານໃຫ້ຖືກຕ້ອງ.',
        type: 'info',
      });
      return;
    }

    const payload: AnimalExportPayload = {
      folderId: folderId,
      animalQuantity: formData.animalQuantity || 0,
      animalForSend: formData.animalForSend || 0,
    };

    // console.log('Payload ທີ່ຈະສົ່ງ:', payload);
    animalExportMutation.mutate(payload);
  };

  if (isLoading) {
    return <Spinner show size="large" />;
  }

  if (isError || !application) {
    return <div className="text-red-500 text-center">ດຶງຂໍ້ມູນບໍ່ສຳເລັດ</div>;
  }
 
  return (
    <div className="border border-gray-400 rounded-sm space-y-6 p-4 max-w-2xl mx-auto">
      <p className="text-xl font-bold">ນຳສັດໃນຟາມອອກ</p>
      <EditApplicationForm
        register={register}
        control={control}
        folders={folders}
        setValue={setValue}
        watch={watch}
        handleSubmit={handleSubmit}
        onFormSubmit={handleFormSubmit}
      />
      {animalExportMutation.isPending && <div className="text-center mt-4">ກຳລັງສົ່ງຂໍ້ມູນ...</div>}
      {animalExportMutation.isError && <div className="text-red-500 text-center mt-4">ຂໍ້ຜິດພາດ: {animalExportMutation.error.message}</div>}

      {/* แสดง Pop-up ถ้า modalState.show เป็น true */}
      {modalState.show && (
        <MessageModal
          title={modalState.title}
          message={modalState.message}
          type={modalState.type}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
