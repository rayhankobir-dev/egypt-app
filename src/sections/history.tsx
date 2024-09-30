/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
import usePost from "@/hooks/use-post";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import RichTextEditor from "@/components/richtext-editor";

export default function HomeHistory({
  historyData = "",
}: {
  historyData: string;
}) {
  const [history, setHistory] = useState<string>(historyData);

  const {
    data,
    postData,
    isLoading: isSubmitting,
    isError: isPostError,
  } = usePost<any>("/home");

  useEffect(() => {
    if (data) {
      setHistory(data.data.home.history || "");
    }
  }, [data]);

  const handleUpdate = async () => {
    await postData(
      {
        history,
      },
      false
    );

    if (isPostError) {
      toast.error("Failed to update history. Please try again.");
    }

    toast.success("History updated successfully.");
  };

  return (
    <div className="py-5">
      <h2 className="font-semibold text-lg text-gray-700 mb-2">Content</h2>
      <RichTextEditor
        initialHtmlString={history}
        onChange={(htmlString) => setHistory(htmlString)}
      />

      <Button className="my-2" onClick={handleUpdate} disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save & Update"}
      </Button>
    </div>
  );
}
