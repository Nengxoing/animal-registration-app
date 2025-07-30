// import { type IDistrict } from "../(address)/district/type";
// import { type INationality } from "../nationality/type";
// import { type IProvince } from "../(address)/province/type";
import { IVillage } from "../(address)/village/type";
import { IPosition } from "../position/type";
import { IProfileGallery } from "../(image)/profileGallery/type";
import { IApplication } from "../(application)/application/type";
import { ICompany } from "../company/type";

export interface IProfile {
  identityNumber: string;
  barcode?: number;
  status: string;
  id: number;
  no: number;
  image: string;
  oldImage: string;
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  height: number;
  weight: number;
  breed: string;
  createdAt: string;
  updatedAt: string;
  applicationNumber: string;
  profileGallery: IProfileGallery[];

  // add date 22-07-2025
  company?: ICompany[];
  application?: IApplication[];
}

// export const exampleProfiles: IProfile[] = [
//   {
//     id: 101,
//     no: 1,
//     barcode: 1234567,
//     // nationalityId: 1,
//     status: "active",
//     image: "https://via.placeholder.com/80x80.png?text=New",
//     oldImage: "https://via.placeholder.com/80x80.png?text=Old",
//     firstName: "Lao",
//     lastName: "Monkey",
//     gender: "ຊາຍ",
//     age: 3,
//     height: 50,
//     weight: 20,
//     breed: "Lao breed",
//     createdAt: "2025-07-11",
//     updatedAt: "2025-07-11",
//     applicationNumber: "AP123456",
//     profileGallery: [],
//   },
//   {
//     id: 102,
//     no: 2,
//     barcode: 7654321,
//     // nationalityId: 2,
//     status: "active",
//     image: "https://via.placeholder.com/80x80.png?text=New",
//     oldImage: "https://via.placeholder.com/80x80.png?text=Old",
//     firstName: "Jane",
//     lastName: "Doe",
//     gender: "ຍິງ",
//     age: 4,
//     height: 45,
//     weight: 22,
//     breed: "Lao breed",
//     createdAt: "2025-07-10",
//     updatedAt: "2025-07-10",
//     applicationNumber: "AP654321",
//     profileGallery: [],
//   },
//   {
//     id: 103,
//     no: 3,
//     barcode: 2468101,
//     // nationalityId: 3,
//     status: "inactive",
//     image: "https://via.placeholder.com/80x80.png?text=New",
//     oldImage: "https://via.placeholder.com/80x80.png?text=Old",
//     firstName: "Meng",
//     lastName: "Moua",
//     gender: "ຊາຍ",
//     age: 2,
//     height: 40,
//     weight: 18,
//     breed: "Lao breed",
//     createdAt: "2025-07-09",
//     updatedAt: "2025-07-09",
//     applicationNumber: "AP998877",
//     profileGallery: [],
//   }
// ];

export interface Position {
  id: number;
  englishName: string;
  laoName: string;
}

export interface BusinessUnit {
  id: number;
  name: string;
  businessCode: string;
  documentFile: string | null;
  businessRegisterBy: string;
}

export interface RegistrationDocument {
  id: number;
  type: string;
  laoName: string;
}

export interface Folder {
  id: number;
  name: string;
  code: string;
  totalApplications: number;
  approvedApplications: number;
}

export interface ProfileData {
  no: number;
  id: number;
  formId: string;
  applicationType: string;
  expirationTerm: string;
  requestDate: string;
  status: string;
  Profile: IProfile;
  Position: Position;
  BusinessUnit: BusinessUnit;
  RegistrationDocument: RegistrationDocument;
  Folder: Folder;
}

export interface IProfileColumns {
  row: {
    getIsSelected: () => boolean;
    toggleSelected: (selected: boolean) => void;
    original?: IProfile;
  };
}

export interface IAggregationChartProfile {
  month: string;
  male: number;
  female: number;
  result: {
    month: string;
    male: number;
    female: number;
  };
}

export interface IHistory {
  id: number,
  comanyId: number,
  issueDate: string,
  expirationDate: string,
  profileId: number,
  type: string,
  village: IVillage,
  company: ICompany,
  position: IPosition
}