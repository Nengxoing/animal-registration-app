/* eslint-disable linebreak-style */
"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import { IApplication } from "../../../../application/type";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { StayPermitCard } from "../../card";

interface BackendResponse {
  status: string;
  message: string;
  result: IApplication;
}

const fetchApplicationById = async (id: number): Promise<IApplication> => {
  const data = await apiClient.get<BackendResponse>(`/application/${id}`);
  if (data.status !== "ok") {
    throw new Error(data.message || "Unexpected API status");
  }

  if (!data.result) {
    throw new Error("No application data found in result.");
  }

  return data.result;
};

const PrintViewPage = () => {
  const params = useParams();
  const applicationId = Number(params?.id);
  const printRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Application-${applicationId}-Print`,
    pageStyle: `
      @page {
        size: A4;
        margin: 5mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          margin: 0 !important;
        }
        .print\\:hidden {
          display: none !important;
        }
      }
    `,
    onBeforePrint: () => {
      // console.log('Preparing to print...');
      return Promise.resolve();
    },
    onAfterPrint: () => {
      // console.log('Print complete!');
    },
  });

  if (isNaN(applicationId)) {
    return <div className="text-center text-red-500">Invalid ID</div>;
  }

  const { data: application, isLoading, isError } = useQuery<IApplication, Error>({
    queryKey: ["application", applicationId],
    queryFn: () => fetchApplicationById(applicationId),
    enabled: !!applicationId,
  });

  if (isLoading) {
    return <Spinner show size="large" />;
  }

  if (isError) {
    return <div className="text-center text-red-500">Error loading application data.</div>;
  }

  if (!application) {
    return <div className="text-center">No application data found.</div>;
  }

  return (
    <div className="flex flex-col items-center p-4">
      <div className="mb-4 print:hidden">
        <Button onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" /> ພິມເອກະສານ
        </Button>
      </div>
      
      <div ref={printRef} className="max-w-5xl w-full">
        <StayPermitCard application={application} />
      </div>
    </div>
  );
};

export default PrintViewPage;