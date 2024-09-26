import AppLogo from "@/assets/logo.png";
import { Helmet } from "react-helmet-async";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/login-form";
import { AuthContext } from "@/contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { isAuth } = useContext(AuthContext);
  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  });

  return (
    <>
      <Helmet>
        <title>Login | World Egypt</title>
      </Helmet>

      <section className="min-w-96 w-fit flex flex-col gap-8 mx-auto p-7 overflow-hidden rounded-xl md:border shadow-lg my-10">
        <div className="flex flex-col items-center justify-center gap-2">
          <img
            className="h-16 w-auto"
            src={AppLogo}
            width={500}
            height={400}
            alt="Logo"
          />
          {/* <h1 className="font-bold text-2xl text-green-800">Egypt Tour</h1> */}
        </div>

        <div className="space-y-2 text-start">
          <h1 className="text-xl font-bold">Login Your Account</h1>
          <p className="font-light text-sm text-gray-500">
            Enter your credentials to access your account
          </p>
        </div>

        <LoginForm />
      </section>
    </>
  );
}
