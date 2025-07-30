/* eslint-disable linebreak-style */
export interface FolderDetail {
    updatedAt: string;
    billNumber: string;
    id: number;
    code: string;
    name: string;
    officeId: number;
    status: string;
    createdAt: string;
    number?: {
        id: number;
        number: string;
        amount: number;
        priceId: number;
        folderId: number;
        isAvailable: boolean;
        createdAt: string;
        updatedAt: string;
        deletedAt: null | string;
        officeId: number;
        price?: {
            id: number;
            name: string;
            price: string | number;
            type: string;
            code?: string;
            duration?: string;
            officeId?: number | null;
            status?: boolean;
            createdAt?: string;
            updatedAt?: string;
            deletedAt?: null | string;
        };
    }[];

    folderPrice: {
        amount: number;
        priceId: number;
        multiple: number;
        totalPrice: string | number;
        price: {
            id: number;
            name: string;
            price: string | number;
            type: string;
        };
        total?: string | number;
    }[];
    totalAmount?: string | number;
    totalPrice?: string | number;
}

export interface FolderOption {
    folderId: number;
    folder: {
        id: number;
        name: string;
        code: string;
        status: string;
        billDate: string | null;
        billNumber: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string | null;
        officeId: number | null;
    };
    totalAmount?: number;
    totalPrice?: number;
}

export interface IApplication {
    company: {
        name: string;
        businessCode: string;
    };
    profile: {
        firstName: string;
        lastName: string;
        gender: string;
    };
    createdAt: string;
    selectedBillNumber: string;
    folderName: string;
    folderCode: string;
    folderBillNumber: string;
    folderCreatedAt: string;
    folderUpdatedAt: string;
    animalQuantity: number;
    animalForSend: number;
    totalPrice: number | string;
    priceName: string;
    priceValue: number | string;
    priceType: string;
    companyId?: number;
    folderId?: number;
}

export interface AnimalExportItem {
    id: number;
    folderId: number;
    animalQuantity: number;
    animalForSend: number;
    exportDate: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    folder?: {
        id: number;
        name: string;
        billNumber: string;
        // Frontend ยังคงคาดหวัง company ที่นี่
        company?: {
            name: string;
            businessCode: string;
        };
    };
}

export interface AnimalExportServiceResponse {
    message: string;
    status: string;
    result: AnimalExportItem[];
    totalCount: number;
    page: number;
    limit: number;
}
