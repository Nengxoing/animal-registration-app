import React, { useRef, useState } from "react";
import { type UseFormReturn } from "react-hook-form";
import { type z } from "zod";
import { Button } from "@/components/containers";
import { Form } from "@/components/containers/form";
import { PersonalInfoSection } from "./field";
import { type profileFormSchema } from "./schema";

interface ProfileFormProps {
  form: UseFormReturn<z.infer<typeof profileFormSchema>>;
  onSubmit: (data: z.infer<typeof profileFormSchema>) => Promise<void>;
  handleNext?: () => void;
  handlePrevious?: () => void;
  action?: "create" | "edit";
}
const ProfileForm: React.FC<ProfileFormProps> = ({ form, onSubmit, action = "create", handlePrevious }) => {

  const disabled = action === "create";
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);
 
  return (
    <>
      <Form formInstance={form} onSubmit={onSubmit} className="border-none shadow-none p-0" showButton={false}>
        <PersonalInfoSection form={form} disabled={disabled}  />
        
        <div className=" space-x-3">
          {action === "create" && (
            <>
              <Button ref={nextButtonRef} loading={form?.formState.isSubmitting} disabled={form?.formState.isSubmitting} >ໄປຕໍ່</Button>
              <Button variant="outline" onClick={handlePrevious} className="w-full sm:w-auto" > ກັບຄືນ </Button>
            </>
          )}
          {action === "edit" && (
            <>
              <Button loading={form?.formState.isSubmitting} disabled={form?.formState.isSubmitting} >ບັນທຶກ</Button>
            </>
          )}
        </div>
      </Form>
    </>
  );
};

export default ProfileForm;

