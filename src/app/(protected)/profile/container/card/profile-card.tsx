/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  Button,
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui";
import { type IProfile } from "../../type";
import { formatDate } from "@/lib/format-date";
import { useRef } from "react";
import Certificate from "./certificate";

interface ProfileCardProps {
  profile: IProfile;
  onEdit?: (profile: number) => void;
  onDelete?: (profile: number) => void;
  onApplication?: (profile: number) => void;
  renewable?: boolean;
  onSend?: (applicationId: number) => void;
}

export function ProfileCard({ profile, onSend }: ProfileCardProps) {
  const application = profile.application?.[0];
  const farmName = application?.company?.name || "-";
  const businessCode = application?.company?.businessCode || "-";
  const folderName = application?.folder?.name || "-";
  const billNumber = application?.folder?.billNumber || "-";
  const barcode = profile?.barcode || "-";
  const createdAt = formatDate({ date: profile?.createdAt });
  const updatedAt = formatDate({ date: profile?.updatedAt });
  const contentRef = useRef<HTMLDivElement>(null);

  const applicationId = application?.id;

  return (
    <Card className="w-full sm:w-96">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="flex-1">
          <h2 className="text-2xl font-bold">
            ຊື່ຟາມ: <span className="font-normal">{farmName}</span>
          </h2>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-3">
          <strong>ເລກທີ່ຫົວໜ່ວຍທຸລະກິດ: <span className="font-normal">{businessCode}</span></strong>
          <strong>ຊື່ແຟ້ມ: <span className="font-normal">{folderName}</span></strong>
          <strong>ເລກທີ່ແຟ້ມ: <span className="font-normal">{billNumber}</span></strong>
          <strong>ບາໂຄດ: <span className="font-normal">{barcode}</span></strong>
        </div>
        <div className="flex justify-between">
          <p>ວັນທີ່ສ້າງ: {createdAt}</p> - 
          <p>ອັບເດດລ່າສຸດ: {updatedAt}</p>
        </div> 

        {applicationId && (
          <Button onClick={() => onSend?.(applicationId)}>ສົ່ງອອກ</Button>
        )}
      </CardContent>

      <div className="hidden print:block">
        <Certificate profileId={profile?.id} ref={contentRef} />
      </div>
    </Card>
  );
}

export default ProfileCard;