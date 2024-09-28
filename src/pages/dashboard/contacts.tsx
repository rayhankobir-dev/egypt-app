/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from "@/components/common/table/data-table";
import SectionTitle from "@/components/section-title";
import Spinner from "@/components/spinner";
import useGet from "@/hooks/use-get";
import { format } from "date-fns";

const columns = [
  {
    accessorKey: "fullName",
    header: () => <div className="font-medium text-nowrap">Full name</div>,
    cell: ({ row }: any) => (
      <div className="text-nowrap">{row.getValue("fullName")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: () => <div className="">Email</div>,
    cell: ({ row }: any) => (
      <div className="text-nowrap">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "subject",
    header: () => <div className="w-72">Subject</div>,
    cell: ({ row }: any) => (
      <div className="line-clamp-2">{row.getValue("subject")}</div>
    ),
  },
  {
    accessorKey: "message",
    header: () => <div className="w-72">Message</div>,
    cell: ({ row }: any) => (
      <div className="line-clamp-2">{row.getValue("message")}</div>
    ),
  },
  {
    accessorKey: "travelDate",
    header: () => <div className="text-nowrap">Travel Date</div>,
    cell: ({ row }: any) => (
      <div className="text-nowrap">
        {row.getValue("travelDate")
          ? format(row.getValue("travelDate"), "PPP")
          : "N/A"}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-nowrap">Created At</div>,
    cell: ({ row }: any) => (
      <div className="text-nowrap">
        {format(row.getValue("createdAt"), "PPP")}
      </div>
    ),
  },
];

export default function AdminContacts() {
  const { data, isLoading, isError } = useGet<any>("/contacts");

  if (isLoading || isError) return <Spinner className="text-green-800" />;
  const contacts = data?.data?.contacts;

  return (
    <section className="flex flex-col gap-7">
      <SectionTitle title="Contacts" description="All contacts" />
      <DataTable
        className={"border rounded-lg"}
        data={contacts}
        columns={columns}
      />
    </section>
  );
}
