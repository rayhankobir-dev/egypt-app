/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";
import usePost from "@/hooks/use-post";
import { Button } from "@/components/ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import SectionTitle from "@/components/section-title";

const AddSlide = () => {
  const { postData } = usePost<any>("/home/slides");

  const initialValues = {
    title: "",
    image: null,
    description: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Slide title is required"),
    image: Yup.mixed().required("A thumbnail image is required"),
    description: Yup.string().required("Slide description is required"),
  });

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    if (values.image && values.image instanceof File) {
      formData.append("image", values.image);
    }
    await postData(formData, true);
  };

  return (
    <section className="w-full flex flex-col gap-5">
      <SectionTitle title="Add Slide" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit({ ...values });
        }}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-5">
            <div>
              <label htmlFor="title" className="block text-sm font-medium">
                Slide Title
              </label>
              <Field
                name="title"
                type="text"
                className="w-full border p-2 rounded-md"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Location Field */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium"
              >
                Description
              </label>
              <Field
                name="description"
                type="text"
                className="w-full border p-2 rounded-md"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label htmlFor="thumbnail" className="block text-sm font-medium">
                Slide Image
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="w-full"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    setFieldValue("image", file);
                  }
                }}
              />
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <Button type="submit">Create & Save</Button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default AddSlide;
