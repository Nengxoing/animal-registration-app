/* eslint-disable no-nested-ternary */

"use client";
import { Card, CardContent } from "@/components/ui";

import { type Step, useMultiStepForm } from "src/app/hook/useMultiStepForm";
import { useBlacklistProfileForm } from "../../blacklist/hook/useForm";
import ProfileForm from "../container/form/form";
import { SuccessStep } from "../container/form/successStep";
import { useProfileForm } from "../hook/useForm"; 
import { Form } from "@/components/containers/form";
import { SquareUserRound } from "lucide-react";

const FORM_STEPS: Step[] = [
  { number: 1, title: "ກວດບັນຊີດໍາ" },
  { number: 2, title: "ປ້ອນຂໍ້ມູນບຸກຄົນ" },
  { number: 3, title: "ສໍາເລັດ" },
];

export default function UserCreate() {
  const { step, handleNext, handlePrevious, handleStepClick, handleReset } = useMultiStepForm(FORM_STEPS);
  const { form, onSubmit } = useBlacklistProfileForm({ handleNext });

  const { form: formProfile, onSubmit: onSubmitProfile } = useProfileForm({ handleNext });
  const handleResetForm = () => {
    form.reset();
    handleReset();
  };
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <ProfileForm form={formProfile} handleNext={handleNext} onSubmit={onSubmitProfile} handlePrevious={handlePrevious} />;
      case 2:
        return <SuccessStep handleReset={handleResetForm} />;
      default:
        return null;
    }
  };
  return (
    <div className="w-full bg-gradient-to-b p-4 flex items-center justify-center">
      <Card className="w-full  mx-auto shadow-lg">
        <CardContent className="pt-6 -mb-8">
          <div className="flex items-start gap-1">
            
            {step === 1 && (
              <div>
                <Form formInstance={formProfile} onSubmit={onSubmitProfile} className="border-none shadow-none -mt-6 -mb-10" showButton={false}>
                  <div className="flex flex-wrap gap-4 items-start">
                    <Form.Field name="image" control={formProfile.control} label="ຮູບພາບ (ຮູບໃຫມ່​)" required={false}>
                      <Form.Input.Image
                        label="3x4 cm"
                        iconImage={<SquareUserRound className="w-10 h-10" />}
                        accept="image/*"
                        className="flex items-center justify-center rounded-lg border border-dashed"
                      />
                    </Form.Field>
                    <Form.Field name="oldImage" control={formProfile.control} label="ຮູບພາບ (ຮູບເກົ່າ)" required={false}>
                      <Form.Input.Image
                        label="3x4 cm"
                        iconImage={<SquareUserRound className="w-10 h-10" />}
                        accept="image/*"
                        className="flex items-center justify-center rounded-lg border border-dashed bg-muted"
                      />
                    </Form.Field>
                  </div>
                </Form>
              </div>
            )}
          </div>
          {renderStepContent()}
        </CardContent>
      </Card>
    </div>
  );
}

