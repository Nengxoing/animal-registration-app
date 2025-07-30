/* eslint-disable linebreak-style */
import { UseFormRegister, Control, UseFormSetValue, UseFormWatch, UseFormHandleSubmit } from "react-hook-form";
import {
  Input,
  Label,
  Button,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui";
import { Controller } from "react-hook-form";
import { FolderOption, IApplication } from "../types/application";

interface EditApplicationFormProps {
  register: UseFormRegister<IApplication>;
  control: Control<IApplication>;
  folders?: FolderOption[];
  setValue: UseFormSetValue<IApplication>;
  watch: UseFormWatch<IApplication>;
  handleSubmit: UseFormHandleSubmit<IApplication>;
  onFormSubmit: (data: IApplication) => void;
}

export const EditApplicationForm: React.FC<EditApplicationFormProps> = ({
  register,
  control,
  folders,
  setValue,
  watch,
  handleSubmit,
  onFormSubmit,
}) => {
  const animalQuantity = watch("animalQuantity");

  const handleSelectAll = () => {
    if (animalQuantity !== undefined && animalQuantity !== null) {
      setValue("animalForSend", animalQuantity);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="grid grid-cols-2 gap-8 items-start justify-start rounded-xs w-full">
      <div className="space-y-2">
        <Label className="block font-medium">ຊື່ຟາມ</Label>
        <Input
          type="text"
          {...register("company.name")}
          className="w-full border border-gray-100 shadow-md px-3 py-2"
          readOnly={true}
        />
      </div>

      <div className="space-y-2">
        <Label className="block font-medium">ເລກທີ່ທຸລະກິດ</Label>
        <Input
          type="text"
          {...register("company.businessCode")}
          className="w-full border border-gray-100 shadow-md px-3 py-2"
          readOnly={true}
        />
      </div>

      <div className="space-y-2 col-span-2">
        <Label className="block font-medium">ກາລຸນາເລືອກແຟ້ມເອກະສານ</Label>
        <Controller
          name="selectedBillNumber"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              onValueChange={(value) => field.onChange(value)}
              value={field.value || ""}
            >
              <SelectTrigger className="w-full border bg-white border-gray-100 shadow-md">
                <SelectValue placeholder="ເລືອກແຟ້ມ" />
              </SelectTrigger>
              <SelectContent>
                {folders?.map((f) => (
                  <SelectItem
                    key={f.folder.billNumber}
                    value={f.folder.billNumber} 
                  >
                    {f.folder.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="space-y-2">
        <Label className="block font-medium">ເລກທີ່ແຟ້ມ</Label>
        <Input
          type="text"
          {...register("folderBillNumber")}
          className="w-full border border-gray-100 shadow-md px-3 py-2"
          readOnly={true}
        />
      </div>

      <div className="space-y-2">
        <Label className="block font-medium">ວັນທີ່ສ້າງແຟ້ມ</Label>
        <Input
          type="date"
          {...register("folderCreatedAt")}
          className="w-full border border-gray-100 shadow-md px-3 py-2"
          readOnly={true}
        />
      </div>

      <div className="space-y-2">
        <Label className="block font-medium">ຈຳນວນສັດທັງໝົດ</Label>
        <Input
          type="number"
          {...register("animalQuantity", { valueAsNumber: true })}
          className="w-full border border-gray-100 shadow-md px-3 py-2"
          readOnly={true}
        />
      </div>

      <div className="space-y-2">
        <Label className="block font-medium">ວັນທີ່ອັບເດດ</Label>
        <Input
          type="date"
          {...register("folderUpdatedAt")}
          className="w-full border border-gray-100 shadow-md px-3 py-2"
          readOnly={true}
        />
      </div>

      <div className="space-y-2">
        <Label className="block font-medium">ຈຳນວນສັດທີ່ຕ້ອງການສົ່ງອອກ</Label>
        <div className="flex justify-between border bg-white border-gray-100 shadow-md items-center gap-2">
          <Controller
            name="animalForSend"
            control={control}
            rules={{
              valueAsNumber: true,
              max: {
                value: animalQuantity || 0,
                message: "ຈຳນວນສັດທີ່ຕ້ອງການສົ່ງອອກຕ້ອງບໍ່ເກີນຈຳນວນສັດທັງໝົດ",
              },
              min: {
                value: 0,
                message: "ຈຳນວນສັດຕ້ອງເປັນຄ່າບວກ",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (animalQuantity !== undefined && animalQuantity !== null && value > animalQuantity) {
                      field.onChange(animalQuantity);
                    } else if (value < 0) {
                      field.onChange(0);
                    } else {
                      field.onChange(value);
                    }
                  }}
                  className={`w-full border-none px-3 py-2 ${error ? "border-red-500" : "border-gray-400"}`}
                />
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="px-4 text-sm py-2 border-none text-gray-600 bg-white h-10 flex-shrink-0 hover:text-sky-600"
                >
                  ເລືອກທັງໝົດ
                </button>
                {error && <p className="text-red-500 text-sm mt-1 col-span-2">{error.message}</p>}
              </>
            )}
          />
        </div>
      </div>
      <Button type="submit" className="w-full col-span-2">ສົ່ງອອກ</Button>
    </form>
  );
};
