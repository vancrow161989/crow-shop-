import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginUserMutation } from "../store/users";
import { loginSchema } from "../utils/formSchema";
import { storeCredentials } from "../store/authSlice";
import { setTokenLocalStorage } from "../services/authService";

function LoginForm({ setAuth }) {
  const location = useLocation();
  const from = location?.state?.from || "/";
  const dispatch = useDispatch();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const navigate = useNavigate();

  const [loginUser, response, isLoading] = useLoginUserMutation();

  const onSubmit = async ({ email, password }) => {
    const responseData = await loginUser({ identifier: email, password });

    if (
      responseData?.error?.data?.error?.status &&
      responseData?.error?.data?.error?.message
    ) {
      if (responseData.error.data.error.status === 400) {
        toast.error("Invalid email or password", {
          position: "top-center",
          closeOnClick: true
        });
      } else {
        toast.error(responseData.error.data.error.message, {
          position: "top-center",
          closeOnClick: true
        });
      }
    } else {
      toast.success("Successfully Logged In", {
        position: "top-center",
        hideProgressBar: true
      });

      dispatch(storeCredentials(responseData.data));
      // setAuth(responseData.data);
      setTokenLocalStorage(responseData.data.jwt);
      reset();

      if (from === "/logout" || from === "/login") {
        return navigate("/", { replace: true });
      }
      return navigate(from, { replace: true });
    }
  };
  return (
    <div className="registration-form pb-20">
      <p className="pb-6 text-center">
        If you don't have an account yet, you can create one {}
        <Link className="text-primary-500 underline" to="/registration">
          here
        </Link>
        .
      </p>
      <div className="login-body billing border bg-gray-100 py-4 px-4 md:px-6 md:py-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group mb-6 basis-full">
            <label htmlFor="email" className="mr-3">
              Email Address
            </label>

            <input
              className="w-full"
              type="text"
              id="email"
              tabIndex="1"
              autoComplete="off"
              required
              {...register("email")}
            />

            {errors.email && (
              <p className="mt-2 bg-[#e74c3c] p-2  text-white">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="input-group mb-6 basis-full">
            <label htmlFor="password" className="mr-3">
              Password
            </label>
            <input
              className="w-full"
              type="password"
              id="password"
              tabIndex="2"
              required
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-2 bg-[#e74c3c] p-2  text-white">
                {errors.password.message}
              </p>
            )}
          </div>
          <button type="submit" className="btn btn-primary btn-full">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
