/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";
import { useFormik } from "formik";
import useGet from "@/hooks/use-get";
import usePost from "@/hooks/use-post";
import Spinner from "@/components/spinner";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { formatErrorObject } from "@/lib/utils";
import SectionTitle from "@/components/section-title";
import RichTextEditor from "@/components/richtext-editor";

const validationSchema = Yup.object({
  name: Yup.string().required("City name is required"),
  location: Yup.string().required("Location is required"),
  thumbnail: Yup.mixed().nullable(),
  description: Yup.string().required("Description is required"),
});

const UpdateCity = () => {
  const { slug } = useParams();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const { data: cityData, isLoading, isError } = useGet<any>(`/cities/${slug}`);
  const {
    postData,
    isLoading: isSubmitting,
    isError: isPostError,
    error,
  } = usePost<any>(`/cities/${slug}`);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      location: "",
      thumbnail: null,
      description: "",
    },
    validationSchema,
    onSubmit: async (values, { setErrors }) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("location", values.location);
      formData.append("description", values.description);

      if (image) {
        formData.append("thumbnail", image);
      }

      await postData(formData, true);

      if (isPostError) {
        setErrors(formatErrorObject(error));
      }
    },
  });

  useEffect(() => {
    if (cityData) {
      const { name, description, location } = cityData.data.city;
      setDescription(description);
      formik.setValues({ name, location, thumbnail: null, description });
    }
  }, [cityData]);

  useEffect(() => {
    if (cityData) {
      setDescription(cityData.data.city.description);
    }
  }, [cityData]);

  if (isLoading) return <Spinner />;
  if (isError) return <p>Error fetching city data</p>;

  return (
    <section className="w-full flex flex-col gap-5">
      <SectionTitle title="Update City" description="Update city details" />
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            City Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="w-full border p-2 rounded-md"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          )}
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium">
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            className="w-full border p-2 rounded-md"
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.location && formik.errors.location && (
            <div className="text-red-500 text-sm">{formik.errors.location}</div>
          )}
        </div>

        <div>
          <label htmlFor="thumbnail" className="block text-sm font-medium">
            Thumbnail
          </label>
          <input
            id="thumbnail"
            name="thumbnail"
            type="file"
            accept="image/*"
            className="w-full"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                setImage(file);
                formik.setFieldValue("thumbnail", file);
              }
            }}
          />
          {formik.touched.thumbnail && formik.errors.thumbnail && (
            <div className="text-red-500 text-sm">
              {formik.errors.thumbnail}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <RichTextEditor
            initialHtmlString={description}
            onChange={(htmlString) => {
              setDescription(htmlString);
              formik.setFieldValue("description", htmlString);
            }}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="text-red-500 text-sm">
              {formik.errors.description}
            </div>
          )}
        </div>

        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Updating..." : "Save & Update"}
        </Button>
      </form>
    </section>
  );
};

export default UpdateCity;
