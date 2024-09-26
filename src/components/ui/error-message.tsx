import { cn } from "@/lib/utils";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface ErrorMessageProps {
  className?: string;
  field: string;
  formik: any;
}

function ErrorMessage({ className, field, formik }: ErrorMessageProps) {
  if (formik.touched[field] && formik.errors[field]) {
    return (
      <p className={cn("text-sm font-light text-rose-600", className)}>
        {formik.errors[field]}
      </p>
    );
  }
  return null;
}

export default ErrorMessage;
