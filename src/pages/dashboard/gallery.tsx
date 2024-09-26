/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Image, Trash2 } from "lucide-react";
import useGet from "@/hooks/use-get";
import axios from "axios";

function AdminGallery() {
  const [images, setImages] = useState<any[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { data, isLoading, isError } = useGet<any>("/gallery");

  useEffect(() => {
    if (data && data.data) {
      setImages(data.data.gallery);
    }
  }, [data, isLoading]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            setPreviewImage(reader.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    },
  });

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("/api/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const uploadedImage = response.data.image;
      setImages((prevImages) => [...prevImages, uploadedImage]); // Update images list
      setPreviewImage(null); // Clear preview after upload
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const deleteImage = async (id: string) => {
    try {
      await axios.delete(`/api/delete-image/${id}`);
      setImages((prevImages) => prevImages.filter((image) => image._id !== id));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading images.</p>;

  return (
    <section className="flex flex-col gap-5">
      <div
        {...getRootProps()}
        className="flex flex-col justify-center items-center gap-4 border-dashed border-2 border-gray-300 p-4 text-center rounded-xl"
      >
        <input {...getInputProps()} />
        <Image size={40} />
        <p>Upload an image to the Gallery, or drag and drop it here.</p>

        {previewImage && (
          <div className="relative">
            <img
              src={previewImage}
              alt="Preview"
              className="h-48 w-auto object-cover mt-4"
            />
            <Button
              onClick={() =>
                handleUpload(new File([previewImage], "image.png"))
              }
              className="mt-2"
            >
              Upload Image
            </Button>
          </div>
        )}
      </div>

      <h1 className="text-2xl font-bold">Gallery Items</h1>

      {images?.length === 0 && (
        <p className="text-gray-500">No images in the gallery.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {images?.map((image: any) => (
          <div className="relative" key={image._id}>
            <Button
              variant="destructive"
              onClick={() => deleteImage(image._id)}
              className="absolute right-2 top-2"
            >
              <Trash2 />
            </Button>
            <img
              src={image.imageUrl}
              alt="Uploaded"
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default AdminGallery;
