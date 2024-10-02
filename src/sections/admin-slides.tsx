/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import SectionTitle from "@/components/section-title";
import { DataTable } from "@/components/common/table/data-table";
import useDelete from "@/hooks/use-delete";
import toast from "react-hot-toast";
import usePut from "@/hooks/use-update";

export default function AdminSlides({ slides, refetch }: any) {
  const columns = [
    {
      accessorKey: "title",
      header: () => <div className="font-medium text-nowrap">Title</div>,
      cell: ({ row }: any) => (
        <div className="w-72 line-clamp-2">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: () => <div className="w-72">Description</div>,

      cell: ({ row }: any) => (
        <div className="w-72 line-clamp-2">{row.getValue("description")}</div>
      ),
    },
    {
      accessorKey: "imageUrl",
      header: () => <div className="">Image</div>,
      cell: ({ row }: any) => (
        <div className="line-clamp-2">
          <img
            src={row.getValue("imageUrl")}
            className="h-10 w-auto aspect-[16/7]"
          />
        </div>
      ),
    },
    {
      accessorKey: "isVisible",
      header: () => <div className="">Visibility</div>,
      cell: ({ row }: any) => {
        const { putData } = usePut<any>("/home/slides/" + row.original._id);
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
      header: () => <div className="text-nowrap">Action</div>,
      cell: ({ row }: any) => {
        const { deleteData } = useDelete<any>(
          `/home/slides/${row.original._id}`
        );

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
    <section className="flex flex-col">
      <div className="flex justify-between items-end mb-5">
        <SectionTitle title="Hero Slider" description="All slides" />
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
