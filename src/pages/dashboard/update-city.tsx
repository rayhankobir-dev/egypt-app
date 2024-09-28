/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import RichTextEditor from "@/components/richtext-editor";
import usePost from "@/hooks/use-post";
import useGet from "@/hooks/use-get";
import { useParams } from "react-router-dom"; // Assuming React Router
import Spinner from "@/components/spinner";

const UpdateCity = () => {
  const { slug } = useParams();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  // Fetch city details
  const { data: cityData, isLoading, isError } = useGet<any>(`/cities/${slug}`);
  const { postData } = usePost<any>(`/cities/${slug}`);

  useEffect(() => {
    if (cityData) {
      setDescription(cityData.description || "");
    }
  }, [cityData]);

  // Debugging: Log cityData and initialValues
  useEffect(() => {
    console.log("cityData:", cityData);
  }, [cityData]);

  if (isLoading) return <Spinner />;
  if (isError) return <p>Error fetching city data</p>;

  const initialValues = {
    name: cityData?.name || "",
    location: cityData?.location || "",
    thumbnail: null,
    description: cityData?.description || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("City name is required"),
    location: Yup.string().required("Location is required"),
    thumbnail: Yup.mixed().nullable(),
    description: Yup.string().required("Description is required"),
  });

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("location", values.location);
    formData.append("description", description);

    if (image) {
      formData.append("thumbnail", image);
    }

    await postData(formData, true);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleSubmit({ ...values, description });
      }}
    >
      {({ setFieldValue, values }) => (
        <Form className="space-y-5">
          {/* City Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              City Name
            </label>
            <Field
              name="name"
              type="text"
              className="w-full border p-2 rounded-md"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Location Field */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium">
              Location
            </label>
            <Field
              name="location"
              type="text"
              className="w-full border p-2 rounded-md"
            />
            <ErrorMessage
              name="location"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Thumbnail Upload */}
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
                  setFieldValue("thumbnail", file); // Pass the file to Formik's state
                }
              }}
            />
            <ErrorMessage
              name="thumbnail"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Description (Rich Text Editor) */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <RichTextEditor
              initialHtmlString={values.description}
              onChange={(htmlString) => {
                setDescription(htmlString);
                setFieldValue("description", htmlString); // Also set description in Formik's state
              }}
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Submit Button */}
          <Button type="submit">Update City</Button>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateCity;
