import { validateImageSchema } from "@/lib/validation";
import { z } from "zod";

const ONE_KB = 1024;
const MAX_FILE_SIZE = 10 * ONE_KB * ONE_KB;
const ACCEPTED_PDF_TYPES = ["application/pdf"];

const extractApplicationFileIds = (applicationFile: Array<{ id?: number }>) => {
  const applicationFileIds: number[] = [];
  for (const file of applicationFile) {
    if (file?.id !== undefined) {
      applicationFileIds.push(file.id);
    }
  }
  return applicationFileIds;
};

export const profileFormSchema = z.object({
  image: validateImageSchema({
    required: false,
    message: "ກະລຸນາເລືອກຮູບພາບ",
  }).or(z.string()),
  oldImage: validateImageSchema({
    required: false,
    message: "ກະລຸນາເລືອກຮູບພາບ",
  }).or(z.string()),
  firstName: z
  .string()
  .optional()
  .nullable(),

lastName: z
  .string()
  .optional()
  .nullable(),

  gender: z.string().min(1, { message: "ກະລຸນາລະບຸເພດ" }),
  weight: z.string().min(1, { message: "ນ້ຳໜັກຕ້ອງເປັນເລກ" }).optional(),
  height: z.string().min(1, { message: "ລວງສູງຕ້ອງເປັນເລກ" }).optional(),
  breed: z.string().min(1, { message: "ກະລຸນາໃສ່ສາຍພັນ" }),
  age: z.string().min(1, { message: "ອາຍຸຕ້ອງເປັນເລກ" }).optional(),
  applicationFile: z.array(
    z.object({
      file: z
        .union([
          z.instanceof(File).refine(
            (file) => file.size <= MAX_FILE_SIZE,
            `Max file size is 10MB.`,
          ).refine(
            (file) => ACCEPTED_PDF_TYPES.includes(file.type),
            "Only .pdf formats are supported.",
          ),
          z.literal(""),
        ])
        .optional(),
      id: z.number().optional(),
      name: z.string().optional(),
    }),
  ).optional(),
  applicationNumber: z.string().min(1, { message: "ກະລຸນາໃສ່ເອກທິຟອມ" }),
}).transform((data) => {
  if (data.applicationFile) {
    const companyFileIds = extractApplicationFileIds(data.applicationFile)
    const newData = {
      ...data,
      companyFileIds,
    }
    return newData
  }
  return data;
});
export const defaultValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  dateOfBirth: "",
  gender: "",
  weight: "",
  height: "",
  breed: "",
  age: "",
  applicationNumber: "",
  applicationFile: [],
};
