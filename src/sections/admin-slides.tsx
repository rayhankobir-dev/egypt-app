/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from "@/api";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/section-title";
import { DataTable } from "@/components/common/table/data-table";

const columns = [
  {
    accessorKey: "title",
    header: () => <div className="font-medium text-nowrap">Title</div>,
    cell: ({ row }: any) => (
      <div className="text-nowrap">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: () => <div className="">Description</div>,

    cell: ({ row }: any) => (
      <div className="text-nowrap">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "imageUrl",
    header: () => <div className="">Image</div>,
    cell: ({ row }: any) => (
      <div className="line-clamp-2">
        <img
          src={API_URL + row.getValue("imageUrl")}
          className="h-10 w-auto aspect-[16/7]"
        />
      </div>
    ),
  },
  {
    accessorKey: "isVisible",
    header: () => <div className="">Visibility</div>,
    cell: ({ row }: any) => (
      <div className="line-clamp-2">
        <Switch defaultChecked={row.getValue("isVisible")} />
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
  {
    accessorKey: "Action",
    header: () => <div className="text-nowrap">Action</div>,
    cell: () => {
      return (
        <div className="flex items-center gap-1.5">
          <Button variant="destructive" className="w-8 h-8 p-1 shadow">
            <Trash2 size={18} />
          </Button>
        </div>
      );
    },
  },
];

export default function AdminSlides({ slides }: any) {
  return (
    <section className="flex flex-col">
      <SectionTitle title="Hero Slider" description="All slides" />
      <div className="flex justify-end mb-5">
        <Button className="h-9 w-fit bg-green-700 hover:bg-green-600">
          <Link to="/admin/slide/add" className="flex items-center gap-1.5">
            <Plus size={18} /> Add new
          </Link>
        </Button>
      </div>
      <DataTable
        className={"border rounded-lg"}
        data={slides}
        columns={columns}
      />
    </section>
  );
}
