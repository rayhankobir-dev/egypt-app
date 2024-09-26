/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { Image as ImageIcon } from "lucide-react";
import * as Yup from "yup";
import Image from "next/image";

interface Props {
  initialValues?: {
    title?: string;
    description?: string;
    image?: File | string;
    status?: boolean;
  };
}

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  image: Yup.mixed().required("Image is required"),
  status: Yup.boolean().default(false).required("Status is required"),
});

const fetchImageAsFile = async (url: string, filename: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
};

export default function HeroForm({ initialValues }: Props) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      title: initialValues?.title || "",
      description: initialValues?.description || "",
      image: initialValues?.image || null,
      status: initialValues?.status || false,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
  });

  useEffect(() => {
    const initializeImage = async () => {
      if (initialValues?.image instanceof File) {
        setImagePreview(URL.createObjectURL(initialValues.image));
      } else if (typeof initialValues?.image === "string") {
        try {
          const file = await fetchImageAsFile(initialValues.image, "image.png");
          setImagePreview(URL.createObjectURL(file));
          formik.setFieldValue("image", file);
        } catch (error) {
          console.error("Error fetching image:", error);
          setImagePreview(null);
        }
      } else {
        setImagePreview(null);
      }
    };

    initializeImage();
  }, [initialValues?.image]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      console.log("Selected File:", file);
      formik.setFieldValue("image", file);

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-2 py-4">
        <Input
          name="title"
          placeholder="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.title && formik.errors.title && (
          <div className="font-light text-sm text-red-500">
            {formik.errors.title}
          </div>
        )}
        <Input
          name="description"
          placeholder="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.description && formik.errors.description && (
          <div className="font-light text-sm text-red-500">
            {formik.errors.description}
          </div>
        )}
        <div className="flex items-center gap-2 py-1.5">
          {imagePreview ? (
            <Image
              className="h-12 w-14 object-fill aspect-square p-1"
              src={imagePreview}
              height={120}
              width={120}
              alt="Image Preview"
            />
          ) : (
            <ImageIcon />
          )}
          <input
            type="file"
            name="image"
            id="image"
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
          />
          <label htmlFor="image" className="cursor-pointer">
            Select image
          </label>
        </div>
        {formik.touched.image && formik.errors.image && (
          <div className="font-light text-sm text-red-500">
            {formik.errors.image}
          </div>
        )}
        <div className="flex flex-col gap-2">
          <label>Status</label>
          <Switch
            checked={formik.values.status}
            onCheckedChange={(val) => formik.setFieldValue("status", val)}
          />
        </div>
        {formik.touched.status && formik.errors.status && (
          <p className="font-light text-sm text-red-500">
            {formik.errors.status}
          </p>
        )}
      </div>

      <Button>Add Slide</Button>
    </form>
  );
}
