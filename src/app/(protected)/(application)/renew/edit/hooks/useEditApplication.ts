/* eslint-disable linebreak-style */
/* eslint-disable indent */
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { apiClient } from "@/lib/axios";
import { FolderDetail, FolderOption, IApplication } from "../types/application";

interface BackendApplicationResponse {
    status: string;
    message: string;
    result: IApplication;
}

interface BackendFoldersResponse {
    status: string;
    message: string;
    result: FolderOption[];
}

interface BackendFolderDetailResponse {
    status: string;
    message: string;
    result: FolderDetail;
}

const fetchApplicationById = async (id: number): Promise<IApplication> => {
    const response = await apiClient.get<BackendApplicationResponse>(`/application/${id}`);
    if (response.status !== "ok") {
        throw new Error(response.message || "Failed to fetch application");
    }
    return response.result;
};

const fetchFoldersByCompanyId = async (companyId: number): Promise<FolderOption[]> => {
    const response = await apiClient.get<BackendFoldersResponse>(`/application/folders/${companyId}`);
    if (response.status !== "ok") {
        throw new Error(response.message);
    }
    return response.result;
};

const fetchFolderDetailsById = async (folderId: number): Promise<FolderDetail> => {
    const response = await apiClient.get<BackendFolderDetailResponse>(`/folder/${folderId}`);
    if (response.status !== "ok") {
        throw new Error(response.message || "Failed to fetch folder details");
    }
    return response.result;
};

export const useEditApplication = () => {
    const params = useParams();
    const applicationId = Number(params?.id);

    const {
        data: application,
        isLoading: isApplicationLoading,
        isError: isApplicationError,
    } = useQuery<IApplication, Error>({
        queryKey: ["application", applicationId],
        queryFn: () => fetchApplicationById(applicationId),
        enabled: !!applicationId,
    });

    const { register, setValue, control, watch, handleSubmit } = useForm<IApplication>();

    const companyId = application?.companyId;

    const {
        data: folders,
        isLoading: isFoldersLoading,
        isError: isFoldersError,
    } = useQuery<FolderOption[]>({
        queryKey: ["folders", companyId],
        queryFn: () => fetchFoldersByCompanyId(companyId as number),
        enabled: !!companyId,
    });

    const selectedBillNumber = watch("selectedBillNumber");

    const selectedFolderOption = folders?.find(
        (f) => f.folder.billNumber === selectedBillNumber,
    );
    const selectedFolderId = selectedFolderOption?.folderId;

    const {
        data: folderDetails,
        isLoading: isFolderDetailsLoading,
        isError: isFolderDetailsError,
    } = useQuery<FolderDetail, Error>({
        queryKey: ["folderDetails", selectedFolderId],
        queryFn: () => fetchFolderDetailsById(selectedFolderId as number),
        enabled: !!selectedFolderId,
    });

    useEffect(() => {
        if (application) {
            setValue("company.name", application.company?.name || "");
            setValue("company.businessCode", application.company?.businessCode || "");
            setValue("profile.firstName", application.profile?.firstName || "");
            setValue("profile.lastName", application.profile?.lastName || "");
            setValue("profile.gender", application.profile?.gender || "");
            setValue("createdAt", application.createdAt || "");
        }
    }, [application, folders, setValue]);

    useEffect(() => {
        if (folderDetails) {
            setValue("folderName", folderDetails.name);
            setValue("folderCode", folderDetails.code);
            setValue("folderBillNumber", folderDetails.billNumber);
            setValue("folderCreatedAt", folderDetails.createdAt ? new Date(folderDetails.createdAt).toISOString().split('T')[0] : "");
            setValue("folderUpdatedAt", folderDetails.updatedAt ? new Date(folderDetails.updatedAt).toISOString().split('T')[0] : "");

            const folderPriceData = folderDetails.folderPrice?.[0];
            if (folderPriceData) {
                setValue("animalQuantity", folderPriceData.amount);
                setValue("totalPrice", folderPriceData.totalPrice);
                setValue("priceName", folderPriceData.price?.name);
                setValue("priceValue", folderPriceData.price?.price);
                setValue("priceType", folderPriceData.price?.type);
            } else {
                setValue("animalQuantity", 0);
                setValue("totalPrice", "-");
                setValue("priceName", "-");
                setValue("priceValue", "-");
                setValue("priceType", "-");
            }
        } else {
            setValue("folderName", "-");
            setValue("folderCode", "-");
            setValue("folderBillNumber", "-");
            setValue("folderCreatedAt", "-");
            setValue("folderUpdatedAt", "-");
            setValue("animalQuantity", 0);
            setValue("totalPrice", "-");
            setValue("priceName", "-");
            setValue("priceValue", "-");
            setValue("priceType", "-");
        }
    }, [folderDetails, setValue]);

    const isLoading = isApplicationLoading || isFoldersLoading || isFolderDetailsLoading;
    const isError = isApplicationError || isFoldersError || isFolderDetailsError;

    return {
        application,
        folders,
        isLoading,
        isError,
        register,
        setValue,
        control,
        watch,
        handleSubmit,
    };
};
