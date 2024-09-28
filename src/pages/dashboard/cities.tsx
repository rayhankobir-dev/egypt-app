/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from "@/api";
import { format } from "date-fns";
import useGet from "@/hooks/use-get";
import { Link } from "react-router-dom";
import Spinner from "@/components/spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash2 } from "lucide-react";
import SectionTitle from "@/components/section-title";
import { DataTable } from "@/components/common/table/data-table";

const columns = [
  {
    accessorKey: "name",
    header: () => <div className="font-medium text-nowrap">City name</div>,
    cell: ({ row }: any) => (
      <div className="text-nowrap">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "location",
    header: () => <div className="">Location</div>,

    cell: ({ row }: any) => (
      <div className="text-nowrap">{row.getValue("location")}</div>
    ),
  },
  {
    accessorKey: "thumbnail",
    header: () => <div className="">Image</div>,
    cell: ({ row }: any) => (
      <div className="line-clamp-2">
        <img
          src={API_URL + row.getValue("thumbnail")}
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
        {row.getValue("isVisible") ? (
          <Badge className="border bg-green-500 text-green-50">Visible</Badge>
        ) : (
          <Badge className="border bg-red-500 text-red-50">Hidden</Badge>
        )}
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
    header: () => <div className="text-nowrap">Created At</div>,
    cell: ({ row }: any) => {
      return (
        <div className="flex items-center gap-1.5">
          <Button
            asChild
            className="w-8 h-8 p-1 shadow bg-blue-600 hover:bg-blue-500"
          >
            <Link to={`/admin/cities/update/${row.original.slug}`}>
              <Edit size={18} />
            </Link>
          </Button>
          <Button variant="destructive" className="w-8 h-8 p-1 shadow">
            <Trash2 size={18} />
          </Button>
        </div>
      );
    },
  },
];

export default function AdminCities() {
  const { data, isLoading, isError } = useGet<any>("/cities");

  if (isLoading || isError) return <Spinner className="text-green-800" />;
  const cities = data?.data?.cities;

  return (
    <section className="flex flex-col">
      <SectionTitle title="Cities" description="All cities" />
      <div className="flex justify-end mb-5">
        <Button className="h-9 w-fit bg-green-700 hover:bg-green-600">
          <Link to="/admin/cities/add" className="flex items-center gap-1.5">
            <Plus size={18} /> Add new
          </Link>
        </Button>
      </div>
      <DataTable
        className={"border rounded-lg"}
        data={cities}
        columns={columns}
      />
    </section>
  );
}
