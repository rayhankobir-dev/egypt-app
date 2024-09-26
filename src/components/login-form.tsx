import * as Yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import Spinner from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ErrorMessage from "@/components/ui/error-message";
import { Eye, EyeOff, LockKeyhole, LogIn, Mail } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { login, isAuthenticating } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      await login(values.email, values.password);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-full relative flex flex-col gap-5"
    >
      <div className="space-y-2">
        {/* Email input */}
        <div className="relative">
          <Mail className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
          <Input
            autoComplete="true"
            id="email"
            name="email"
            type="email"
            className="pl-12 h-12 rounded-xl"
            placeholder="Email address"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <ErrorMessage className="mt-1" field="email" formik={formik} />
        </div>

        {/* Password input */}
        <div className="relative group">
          <LockKeyhole className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
          <Input
            id="password"
            name="password"
            className="pl-12 h-12 rounded-xl"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {isPasswordVisible ? (
            <button
              className="absolute z-10 right-3.5 top-3.5 h-5 w-5"
              type="button"
              onClick={() => setIsPasswordVisible(false)}
            >
              <EyeOff className="text-gray-400 hover:text-gray-700 cursor-pointer duration-300" />
            </button>
          ) : (
            <button
              className="absolute z-10 right-3.5 top-3.5 h-5 w-5"
              type="button"
              onClick={() => setIsPasswordVisible(true)}
            >
              <Eye className="text-gray-400 hover:text-gray-700 cursor-pointer duration-300" />
            </button>
          )}
          <ErrorMessage className="mt-1" field="password" formik={formik} />
        </div>
      </div>

      <Button
        className="w-full h-11 flex gap-2 rounded-xl bg-green-900 hover:bg-green-800"
        type="submit"
        disabled={isAuthenticating}
      >
        {isAuthenticating ? (
          <Spinner text="Authenticating.." />
        ) : (
          <>
            Login <LogIn size={16} />
          </>
        )}
      </Button>
    </form>
  );
}

export default LoginForm;
