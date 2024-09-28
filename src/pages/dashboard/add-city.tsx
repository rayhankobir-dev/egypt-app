/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";
import { useState } from "react";
import usePost from "@/hooks/use-post";
import { Button } from "@/components/ui/button";
import RichTextEditor from "@/components/richtext-editor";
import { Formik, Form, Field, ErrorMessage } from "formik";

const AddCity = () => {
  const [description, setDescription] = useState("");
  const { postData } = usePost<any>("/cities");

  const initialValues = {
    name: "",
    location: "",
    thumbnail: null,
    description: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("City name is required"),
    location: Yup.string().required("Location is required"),
    thumbnail: Yup.mixed().required("A thumbnail image is required"),
    description: Yup.string().required("Description is required"),
  });

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("location", values.location);
    formData.append("description", description);
    if (values.thumbnail && values.thumbnail instanceof File) {
      formData.append("thumbnail", values.thumbnail);
    }
    await postData(formData, true);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleSubmit({ ...values, description });
      }}
    >
      {({ setFieldValue, values }) => (
        <Form className="space-y-5">
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
                  setFieldValue("thumbnail", file);
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
          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddCity;
