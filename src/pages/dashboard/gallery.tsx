/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Image, Trash2 } from "lucide-react";
import useGet from "@/hooks/use-get";
import axiosInstance, { API_URL } from "@/api";
import usePost from "@/hooks/use-post";
import toast from "react-hot-toast";
import Spinner from "@/components/spinner";

function AdminGallery() {
  const [images, setImages] = useState<any[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { data, isLoading } = useGet<any>("/gallery");
  const {
    data: uploadData,
    isLoading: isUploading,
    postData,
  } = usePost<any>("/gallery");

  useEffect(() => {
    if (data && data.data) {
      setImages(data.data.gallery);
    }
  }, [data, isLoading]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.result) {
          setPreviewImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select an image to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("image", selectedFile);

    toast.promise(postData(formData, true), {
      loading: "Uploading image...",
      success: () => {
        const uploadedImage = uploadData.data.gallery;
        setImages((prevImages) => [...prevImages, uploadedImage]);
        setPreviewImage(null);
        setSelectedFile(null);
        return "Image uploaded successfully.";
      },
      error: "Failed to upload image. Please try again.",
    });
  };

  const deleteImage = async (id: string) => {
    try {
      await axiosInstance.delete(`/gallery/${id}`);
      setImages((prevImages) => prevImages.filter((image) => image._id !== id));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <section className="w-full flex flex-col gap-5">
      <div className="flex flex-col justify-center items-center gap-4 border-dashed border-2 border-gray-300 p-4 text-center rounded-xl">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
        />
        <Image size={40} />
        <p>Upload an image to the Gallery.</p>

        {previewImage && (
          <div className="relative">
            <img
              src={previewImage}
              alt="Preview"
              className="h-48 w-auto object-cover mt-4"
            />
            <Button
              disabled={isUploading}
              onClick={handleUpload}
              className="mt-2"
            >
              {isUploading ? "Uploading..." : "Upload Image"}
            </Button>
          </div>
        )}
      </div>

      <h1 className="text-2xl font-bold">Gallery Items</h1>

      {images?.length === 0 && (
        <p className="text-gray-500">No images in the gallery.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {images?.map((image: any, index: number) => (
          <div className="relative" key={index}>
            <Button
              variant="destructive"
              onClick={() => deleteImage(image._id)}
              className="absolute right-2 top-2 w-8 h-8 p-1"
            >
              <Trash2 size={18} />
            </Button>
            <img
              src={image.imageUrl}
              alt="Uploaded"
              className="w-full h-auto aspect-[16/10] object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default AdminGallery;
