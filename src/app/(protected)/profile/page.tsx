/* eslint-disable linebreak-style */
"use client";
import { LayoutGrid, TableProperties } from "lucide-react";
import { useEffect } from "react";

import { CreateButton } from "@/components/containers/create-button";
import { DataTable } from "@/components/containers/table/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { Tab } from "@headlessui/react";
import { TitleLabel } from "@/components/containers/headerLabel";
import { columnsProfile } from "./container/table/columns";
import { DataTableToolbar } from "./container/table/filter";
import useProfileTable from "./hook/useTable";
import ProfileGrid from "./container/card/profile-grid";
import { CardPagination } from "@/components/containers/table/data-card-pagination";
import { BlacklistTable } from "../blacklist/table";

export default function UserPage() {
  return (
    <div className="pl-4 space-y-2"> 
      <div className="flex justify-between items-center">
        <TitleLabel title='ຄຸ້ມຄອງສັດ' subtitle='ນີ້ແມ່ນລາຍການຂໍ້ມູນລົງທະບຽນສັດ 10-50 ລາຍການຫຼ້າສຸດ' />
        <CreateButton resouce="profile" title='ລົງທະບຽນສັດ' />
      </div>
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">ໜ້າຂໍ້ມູນສັດ</TabsTrigger>
          <TabsTrigger value="backlist">ໜ້າຂໍ້ມູນສັດທີ່ຂື້ນຊີດຳ</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <TableUser />
        </TabsContent>
        <TabsContent value="backlist">
          <BlacklistTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TableUser() {
  const { result, meta, updatePagination, updateSearch, filter, loading } = useProfileTable({
    excludeApplications: false,
  });

  const cleanData = result?.map((item) => ({
    ...item,
    profileGallery: item.profileGallery ?? [],
  }));

  const handleTabChange = useHandleTabChange(updatePagination);

  return (
    <div>
      <Tab.Group onChange={handleTabChange}>
        <Tab.List className="flex justify-end">
          <Tab className={({ selected }) =>
            selected ? "border-b-2 border-[--primary] p-2" : "p-2 hover:text-[--primary]"
          }>
            <TableProperties />
          </Tab>
          <Tab className={({ selected }) =>
            selected ? "border-b-2 border-[--primary] p-2" : "p-2 hover:text-[--primary]"
          }>
            <LayoutGrid />
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className="space-y-4">
            <DataTableToolbar updateSearch={updateSearch} filter={filter} />
            <DataTable
              columns={columnsProfile}
              data={cleanData}
              meta={meta}
              updatePagination={updatePagination}
              loading={loading}
            />
          </Tab.Panel>
          <Tab.Panel className="space-y-4">
            <DataTableToolbar updateSearch={updateSearch} filter={filter} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
              {cleanData?.map((item) => (
                <ProfileGrid key={item.no} data={[item]} />
              ))}
            </div>
            <CardPagination meta={meta} updatePagination={updatePagination} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

function useHandleTabChange(updatePagination: (newPagination: { limit: number }) => void) {
  useEffect(() => {
    updatePagination({ limit: 10 });
  }, [updatePagination]);

  const handleTabChange = (index: number) => {
    if (index === 0) {
      updatePagination({ limit: 10 });
    } else {
      updatePagination({ limit: 8 });
    }
  };
  return handleTabChange;
}
