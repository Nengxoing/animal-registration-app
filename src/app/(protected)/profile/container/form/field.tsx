/* eslint-disable max-nested-callbacks */
import { Form } from "@/components/containers/form";
import { IFormDistrictProps, type IFormProps } from "@/lib/interface";
import { useUpdateDefaultValues } from "@/lib/update-default-values";

import React, { useEffect } from "react";
import useeDistrictCombobox from "src/app/(protected)/(address)/district/hook/useDistrictCombobox";
import { usenationalitiesCombobox } from "src/app/(protected)/nationality/hook/usenationalitiesCombobox";
import useeProvinceCombobox from "src/app/(protected)/(address)/province/hook/useProvinceCombobox";
import useeVillageCombobox from "src/app/(protected)/(address)/village/hook/useDistrictCombobox";
import { handleEnterFocusNext } from "./field-focus";
import { CalendarDate } from "@internationalized/date"; 

const genderOptions = [
  { value: "ເພດຜູ້", label: "ເພດຜູ້" },
  { value: "ເພດແມ່", label: "ເພດແມ່" },
];

const animalId = [ 
  { value: "3107250001", label: "3107250001" },
  { value: "3107250002", label: "3107250002" },
  { value: "3107250003", label: "3107250003" },
]

export const PersonalInfoSection: React.FC<IFormProps & { 
  disabled?: boolean,
}> = ({ form, disabled }) => {
  
  return (
    <div className="space-y-4 -mt-5">
      <h3 className="text-lg font-medium">ຂໍ້ມູນສ່ວນຕົວ</h3>
      <div className="grid gap-4 sm:grid-cols-1">
        <div className="grid gap-4 sm:grid-cols-3">
          <Form.Field name="firstName" control={form.control} label="ຊື່ແທ້" >
            <Form.Input.Input placeholder="ປ້ອນຊື່" required onKeyDown={handleEnterFocusNext} />
          </Form.Field>
          
          <Form.Field name="applicationNumber" control={form.control} label="ເລກທີແຟ້ມ" >
            <Form.Input.Input placeholder="ປ້ອນເລກທີແຟ້ມ" required onKeyDown={handleEnterFocusNext}/>
          </Form.Field>
          
          <Form.Field name="billItem" control={form.control} label="ເລືອກໄອດີສັດ">
            <Form.Input.Select options={animalId} className='w-full' required onKeyDown={handleEnterFocusNext}/>
          </Form.Field>
          
          <Form.Field name="gender" control={form.control} label="ເພດ">
            <Form.Input.Select options={genderOptions} className='w-full' required onKeyDown={handleEnterFocusNext} defaultValue="MALE"/>
          </Form.Field>
          
          <Form.Field name="weight" control={form.control} label="ນ້ຳໜັກ" >
            <Form.Input.Input placeholder="ນ້ຳໜັກ kg" required onKeyDown={handleEnterFocusNext}/>
          </Form.Field>
          
          <Form.Field name="height" control={form.control} label="ລວງສູງ" >
            <Form.Input.Input placeholder="ລວງສູງ cm" required onKeyDown={handleEnterFocusNext}/>
          </Form.Field>
          
          <Form.Field name="breed" control={form.control} label="ສາຍພັນ" >
            <Form.Input.Input placeholder="ສາຍພັນ" required onKeyDown={handleEnterFocusNext}/>
          </Form.Field>
          
          <Form.Field name="age" control={form.control} label="ອາຍຸ" >
            <Form.Input.Input placeholder="ອາຍຸ" required onKeyDown={handleEnterFocusNext}/>
          </Form.Field>
          
        </div>
        
      </div>
    </div>
  );
};

export const IdentitySection: React.FC<IFormProps> = ({ form }) => {
  useUpdateDefaultValues({ form, fieldName: "identityType", value: "nationalId", shouldUpdate: true });
  const currentDay = new Date();  
  const year = currentDay.getUTCFullYear();
  const month = currentDay.getUTCMonth() + 1;
  const day = currentDay.getUTCDate(); 
  // eslint-disable-next-line no-magic-numbers
  const expireDate = new CalendarDate(year, month, day);
  useEffect(() => {
    const currentDay = new Date();
    const isoString = currentDay.toISOString();
    form.setValue("identityExpiryDate", isoString);
  }, []);
  return (
    <div></div>
  );
};
export const CurrentAddressSection: React.FC<IFormDistrictProps> = ({ form, setIsAddingVillage }) => {
  const initializeProvinceId = form.watch("currentProvince") ?? 0;
  const initializeDistrictId = form.watch("currentDistrict") ?? 0;
  const { result: provinceOptions } = useeProvinceCombobox();
  const { result: districtOptions } = useeDistrictCombobox({ provinceId: initializeProvinceId });
  const { result: villageOptions } = useeVillageCombobox({ districtId: initializeDistrictId });
  useUpdateDefaultValues({ form, fieldName: "currentVillageId", value: 4, shouldUpdate: true });
  useUpdateDefaultValues({ form, fieldName: "currentProvince", value: 5, shouldUpdate: true });
  useUpdateDefaultValues({ form, fieldName: "currentDistrict", value: 149, shouldUpdate: true });
  const extendedVillageOptions = [
    { label: '+ ເພີ່ມບ້ານ', value: 'add' },
    ...villageOptions,
  ];
  const handleVillageChange = (value: string | number) => {
    if (value === 'add') {
      setIsAddingVillage(true);
      form.setValue('currentVillageId', '');
    } else {
      setIsAddingVillage(false);
      form.setValue('currentVillageId', value);
    }
  };
  return (
    <div></div>
  );
};
export const OverseasAddressSection: React.FC<IFormProps> = ({ form }) => {
  const { result: ethnicityOptions } = usenationalitiesCombobox({ isNationality: true });
  useUpdateDefaultValues({ form, fieldName: "overseasCountryId", value: 104, shouldUpdate: true });
  return (
    <div></div>
  );
};
export const ProfileDocuments: React.FC<IFormProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">ອັບໂຫຼດເອກະສານ</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <Form.Field name="profileFile" control={form.control} label="ເອກກະສານ" required={false}>
          <Form.Input.File name="profileFile" control={form.control} maxFiles={10}/>
        </Form.Field>
      </div>
    </div>
  );
};