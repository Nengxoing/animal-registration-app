import { type ICompany } from "../company/company/type";

export interface IBlacklist {
  no: number;
  id: number;
  companyId: number;
  reason: string;
  blacklistedBy: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  company: ICompany;
}

export interface IBlacklistColumns {
  row: {
    getIsSelected: () => boolean;
    toggleSelected: (selected: boolean) => void;
    original?: IBlacklist;
  };
}
