/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import { Send } from "lucide-react";
import toast from "react-hot-toast";
import usePost from "@/hooks/use-post";
import Spinner from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import ErrorMessage from "@/components/ui/error-message";
import { cn, formatErrorObject } from "@/lib/utils";

interface FormValues {
  fullName: string;
  email: string;
  subject: string;
  message: string;
  travelDate?: Date | null;
}

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  subject: Yup.string().required("Subject is required"),
  travelDate: Yup.date().nullable().optional(),
  message: Yup.string().required("Message is required"),
});

function ContactForm({ className }: { className?: string }) {
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const { data, isLoading, isError, error, postData } =
    usePost<any>("/contacts");

  const initialValues: FormValues = {
    fullName: "",
    email: "",
    subject: "",
    message: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    onSubmit: async (values, { resetForm, setErrors }) => {
      await postData(values, false);

      if (isError) {
        setErrors(formatErrorObject(error));
      } else {
        toast.success(data.message);
        resetForm();
        setCaptchaValue(null);
        console.log(captchaValue);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={cn("flex flex-col gap-2.5", className)}
    >
      {/* Full Name Input */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-gray-800" htmlFor="fullName">
          Full name
        </Label>
        <Input
          id="fullName"
          type="text"
          name="fullName"
          placeholder="Enter your name"
          className="w-full h-12 rounded-lg py-3 px-4 text-gray-800 text-sm border-green-900"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <ErrorMessage field="fullName" formik={formik} />
      </div>

      {/* Email Input */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-gray-800" htmlFor="email">
          Email address
        </Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          className="w-full h-12 rounded-lg py-3 px-4 text-gray-800 text-sm border-green-900"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <ErrorMessage field="email" formik={formik} />
      </div>

      {/* Subject Input */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-gray-800" htmlFor="subject">
          Subject
        </Label>
        <Input
          id="subject"
          type="text"
          name="subject"
          placeholder="Enter the subject"
          className="w-full h-12 rounded-lg py-3 px-4 text-gray-800 text-sm border-green-900"
          value={formik.values.subject}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <ErrorMessage field="subject" formik={formik} />
      </div>

      {/* Travel Date Picker */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-gray-800" htmlFor="travelDate">
          Estimate Travel Date
        </Label>
        <DatePicker
          className="border-green-900"
          date={formik.values.travelDate || undefined}
          onDateChange={(date) => formik.setFieldValue("travelDate", date)}
        />
        <ErrorMessage field="travelDate" formik={formik} />
      </div>

      {/* Message Textarea */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-gray-800" htmlFor="message">
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Enter your message or query"
          className="w-full rounded-lg py-3 px-4 text-gray-800 text-sm border-green-900"
          value={formik.values.message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <ErrorMessage field="message" formik={formik} />
      </div>

      {/* ReCAPTCHA */}
      <div className="flex">
        <ReCAPTCHA
          sitekey={"dgdfg"}
          onChange={(value) => setCaptchaValue(value)}
        />
        <ErrorMessage field="captcha" formik={formik} />
      </div>

      <Button
        disabled={isLoading}
        type="submit"
        className="w-full h-12 flex items-center justify-center gap-2 px-4 py-3 text-sm text-white tracking-wide bg-green-900 hover:bg-green-800 rounded-xl transition-all duration-300"
      >
        {isLoading ? (
          <Spinner text="Sending" />
        ) : (
          <>
            <Send size={18} />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}

export default ContactForm;
