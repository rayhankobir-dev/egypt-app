/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from "@/api";
import { format } from "date-fns";
import toast from "react-hot-toast";
import useGet from "@/hooks/use-get";
import { Link } from "react-router-dom";
import usePut from "@/hooks/use-update";
import Spinner from "@/components/spinner";
import useDelete from "@/hooks/use-delete";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash2 } from "lucide-react";
import SectionTitle from "@/components/section-title";
import { DataTable } from "@/components/common/table/data-table";

export default function AdminCities() {
  const { data, isLoading, refetch } = useGet<any>("/cities/admin");

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
            src={row.getValue("thumbnail")}
            className="h-10 w-auto aspect-[16/7]"
          />
        </div>
      ),
    },
    {
      accessorKey: "isVisible",
      header: () => <div className="">Visibility</div>,
      cell: ({ row }: any) => {
        const { putData } = usePut<any>("/cities/" + row.original._id);
        async function handleUpdate(value: boolean) {
          console.log(value);
          toast.promise(putData({ isVisible: !row.getValue("isVisible") }), {
            loading: "Updating...",
            success: () => {
              refetch();
              return "City updated successfully";
            },
            error: "Failed to update city. Please try again.",
          });
        }
        return (
          <div className="line-clamp-2">
            <Switch
              defaultChecked={row.getValue("isVisible")}
              onCheckedChange={handleUpdate}
            />
          </div>
        );
      },
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
        const { deleteData } = useDelete<any>(`/cities/${row.original._id}`);

        async function handleDelete() {
          toast.promise(deleteData(), {
            loading: "Deleting...",
            success: () => {
              refetch();
              return "City deleted successfully";
            },
            error: "Failed to delete city. Please try again.",
          });
        }

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
            <Button
              onClick={handleDelete}
              variant="destructive"
              className="w-8 h-8 p-1 shadow"
            >
              <Trash2 size={18} />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <section className="w-full flex flex-col">
      <div className="flex justify-between items-end mb-5">
        <SectionTitle title="Cities" description="All cities" />
        <Button className="h-9 w-fit bg-green-700 hover:bg-green-600">
          <Link to="/admin/cities/add" className="flex items-center gap-1.5">
            <Plus size={18} /> Add new
          </Link>
        </Button>
      </div>
      {isLoading ? (
        <Spinner className="text-green-800" />
      ) : (
        <DataTable
          className={"border rounded-lg"}
          data={data?.data?.cities}
          columns={columns}
        />
      )}
    </section>
  );
}
