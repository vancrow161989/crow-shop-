import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterUserMutation } from "../store/users";
import { registrationSchema } from "../utils/formSchema";
import { storeCredentials } from "../store/authSlice";
import { userViewModel } from "../utils/helpers";
import { setTokenLocalStorage } from "./../services/authService";
import { countriesList } from "../services/countryService";
import "react-toastify/dist/ReactToastify.css";

function RegistrationForm() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registrationSchema)
  });
  const navigate = useNavigate();
  const [registerUser, response] = useRegisterUserMutation();
  const dispatch = useDispatch();

  const onSubmit = async (formData) => {
    const responseData = await registerUser(userViewModel(formData));

    if (
      responseData?.error?.data?.error?.status &&
      responseData?.error?.data?.error?.message
    ) {
      toast.error(responseData.error.data.error.message, {
        position: "top-center",
        closeOnClick: true
      });
    } else {
      toast.success("Successfully Registered", {
        position: "top-center",
        hideProgressBar: true
      });
      dispatch(storeCredentials(responseData.data));
      setTokenLocalStorage(responseData.data.jwt);
      reset();
      navigate("/");
    }
  };

  return (
    <div className="registration-form pb-20">
      <p className="pb-6 text-center">
        If you already have an account, you can login {}
        <Link className="text-primary-500 underline" to="/login">
          here
        </Link>
        .
      </p>
      <div className="registration-body billing border bg-gray-100 py-4 px-4 md:px-6 md:py-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group mb-6 basis-full">
            <label htmlFor="BillingFirstName" className="mr-3">
              username
            </label>

            <input
              autoFocus
              className="w-full"
              type="text"
              id="username"
              tabIndex="1"
              {...register("username")}
            />

            {errors.billingFirstName && (
              <p className="mt-2 bg-[#e74c3c] p-2  text-white">
                {errors.billingFirstName.message}
              </p>
            )}
          </div>
          <div className="input-groups sm:flex sm:justify-between sm:gap-4">
            <div className="input-group mb-6 basis-full">
              <label htmlFor="BillingFirstName" className="mr-3">
                First Name
              </label>

              <input
                className="w-full"
                type="text"
                id="BillingFirstName"
                tabIndex="2"
                {...register("billingFirstName")}
              />

              {errors.billingFirstName && (
                <p className="mt-2 bg-[#e74c3c] p-2  text-white">
                  {errors.billingFirstName.message}
                </p>
              )}
            </div>
            <div className="input-group mb-6 basis-full">
              <label htmlFor="billingLastName" className="mr-3">
                Last Name
              </label>
              <input
                className="w-full"
                type="text"
                id="billingLastName"
                tabIndex="3"
                {...register("billingLastName")}
              />
              {errors.billingLastName && (
                <p className="mt-2 bg-[#e74c3c] p-2  text-white">
                  {errors.billingLastName.message}
                </p>
              )}
            </div>
          </div>
          <div className="input-group mb-6">
            <label htmlFor="billingCountry" className="mr-3">
              Country
            </label>
            <select
              className="w-full"
              id="billingCountry"
              tabIndex="4"
              {...register("billingCountry")}>
              <option value="">Select Country</option>
              {countriesList.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.billingCountry && (
              <p className="mt-2 bg-[#e74c3c] p-2  text-white">
                {errors.billingCountry.message}
              </p>
            )}
          </div>
          <div className="input-groups sm:flex  sm:justify-between sm:gap-4">
            <div className="input-group mb-6 basis-full">
              <label htmlFor="billingStreetAddress" className="mr-3">
                Street Address
              </label>
              <input
                className="w-full"
                type="text"
                id="billingStreetAddress"
                tabIndex="5"
                {...register("billingStreetAddress")}
              />
              {errors.billingStreetAddress && (
                <p className="mt-2 bg-[#e74c3c] p-2  text-white">
                  {errors.billingStreetAddress.message}
                </p>
              )}
            </div>
            <div className="input-group mb-6 basis-full">
              <label htmlFor="billingCity" className="mr-3">
                City
              </label>
              <input
                className="w-full"
                type="text"
                id="billingCity"
                tabIndex="6"
                {...register("billingCity")}
              />
              {errors.billingCity && (
                <p className="mt-2 bg-[#e74c3c] p-2  text-white">
                  {errors.billingCity.message}
                </p>
              )}
            </div>
          </div>
          <div className="input-groups sm:flex sm:justify-between sm:gap-4">
            <div className="input-group mb-6 basis-full ">
              <label htmlFor="billingState" classme="mr-3">
                State
              </label>
              <input
                className="w-full"
                type="text"
                id="billingState"
                tabIndex="7"
                {...register("billingState")}
              />
              {errors.billingState && (
                <p className="mt-2 bg-[#e74c3c] p-2  text-white">
                  {errors.billingState.message}
                </p>
              )}
            </div>
            <div className="input-group mb-6 basis-full">
              <label htmlFor="billingZipCode" className="mr-3">
                Zip Code
              </label>
              <input
                className="w-full"
                type="text"
                id="billingZipCode"
                tabIndex="8"
                {...register("billingZipCode")}
              />
              {errors.billingZipCode && (
                <p className="mt-2 bg-[#e74c3c] p-2  text-white">
                  {errors.billingZipCode.message}
                </p>
              )}
            </div>
          </div>
          <div className="input-groups sm:flex sm:justify-between sm:gap-4">
            <div className="input-group mb-6 basis-full">
              <label htmlFor="email" className="mr-3">
                Email
              </label>

              <input
                className="w-full"
                type="text"
                id="email"
                tabIndex="9"
                {...register("email")}
              />

              {errors.email && (
                <p className="mt-2 bg-[#e74c3c] p-2  text-white">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="input-group mb-6 basis-full">
              <label htmlFor="email" className="mr-3">
                Confirm Email
              </label>

              <input
                className="w-full"
                autoComplete="off"
                type="text"
                id="confirmEmail"
                tabIndex="10"
                {...register("confirmEmail")}
              />

              {errors.confirmEmail && (
                <p className="mt-2 bg-[#e74c3c] p-2  text-white">
                  {errors.confirmEmail.message}
                </p>
              )}
            </div>
          </div>
          <div className="input-groups sm:flex sm:justify-between sm:gap-4">
            <div className="input-group mb-6 basis-full">
              <label htmlFor="phoneNumber" className="mr-3">
                Phone Number
              </label>

              <input
                className="w-full"
                type="tel"
                id="phoneNumber"
                tabIndex="11"
                {...register("phoneNumber")}
              />

              {errors.phoneNumber && (
                <p className="mt-2 bg-[#e74c3c] p-2  text-white">
                  {errors.phoneNumber.message}
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
                tabIndex="12"
                {...register("password")}
              />
              {errors.password && (
                <p className="mt-2 bg-[#e74c3c] p-2  text-white">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-full">
            Register
          </button>
        </form>
      </div>
      <p className="py-6 text-center">
        If you already have an account, you can login {}
        <Link className="text-primary-500 underline" to="/login">
          here
        </Link>
        .
      </p>
    </div>
  );
}

export default RegistrationForm;
