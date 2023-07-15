import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { storeCredentials } from "../../store/authSlice";
import { basicInfoSchema } from "../../utils/formSchema";
import { useUpdateUserMutation } from "../../store/users";
import { getTokenLocalStorage } from "../../services/authService";
import { countriesList } from "./../../services/countryService";

function ProfileInfo({ profileData }) {
  const [isFormDisable, setFormDisable] = useState(true);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const dispatch = useDispatch();

  const {
    firstName,
    lastName,
    state,
    country,
    streetAddress,
    city,
    phoneNumber,
    zipCode
  } = profileData ?? {};

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      firstName,
      lastName,
      state,
      country,
      streetAddress,
      city,
      phoneNumber,
      zipCode
    }
  });

  useEffect(() => {
    reset(profileData);
  }, [profileData, reset]);

  const onSubmit = async (formData) => {
    const responseData = await updateUser({
      userId: profileData.id,
      data: formData
    });

    if (
      responseData?.error?.data?.error?.status &&
      responseData?.error?.data?.error?.message
    ) {
      toast.error(responseData.error.data.error.message, {
        position: "top-center",
        closeOnClick: true
      });
    } else {
      toast.success("Successfully Updated", {
        position: "top-center",
        hideProgressBar: true
      });

      dispatch(
        storeCredentials({
          user: responseData.data,
          jwt: getTokenLocalStorage()
        })
      );
      setFormDisable(true);
    }
  };

  return (
    <>
      <h2 className="md:text-xlg font-body text-2xl  text-gray-700 md:leading-normal">
        Profile Information
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-groups sm:flex sm:justify-between sm:gap-4">
          <div className="input-group mb-6 basis-full">
            <label htmlFor="firstName" className="mr-3">
              First Name
            </label>

            <input
              autoFocus
              className="w-full disabled:border-0 disabled:bg-transparent disabled:pl-0 disabled:font-semibold"
              type="text"
              id="firstName"
              tabIndex="1"
              disabled={isFormDisable}
              {...register("firstName")}
            />

            {errors.firstName && (
              <p className="mt-2 bg-[#e74c3c] p-2  text-white">
                {errors.firstname.message}
              </p>
            )}
          </div>
          <div className="input-group mb-6 basis-full">
            <label htmlFor="lastName" className="mr-3">
              Last Name
            </label>
            <input
              className="w-full disabled:border-0 disabled:bg-transparent disabled:pl-0 disabled:font-semibold"
              type="text"
              id="lastName"
              tabIndex="2"
              disabled={isFormDisable}
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="mt-2 bg-[#e74c3c] p-2  text-white">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>
        <div className="input-group mb-6">
          <label htmlFor="country" className="mr-3">
            Country
          </label>
          <select
            className="w-full disabled:appearance-none disabled:border-0 disabled:bg-transparent disabled:pl-0 disabled:font-semibold"
            id="country"
            tabIndex="3"
            disabled={isFormDisable}
            {...register("country")}>
            <option value="">Select Country</option>
            {countriesList.map((country) => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.country && (
            <p className="mt-2 bg-[#e74c3c] p-2  text-white">
              {errors.country.message}
            </p>
          )}
        </div>
        <div className="input-groups sm:flex  sm:justify-between sm:gap-4">
          <div className="input-group mb-6 basis-full">
            <label htmlFor="streetAddress" className="mr-3">
              Street Address
            </label>
            <input
              className="w-full disabled:border-0 disabled:bg-transparent disabled:pl-0 disabled:font-semibold"
              type="text"
              id="streetAddress"
              tabIndex="4"
              disabled={isFormDisable}
              {...register("streetAddress")}
            />
            {errors.streetAddress && (
              <p className="mt-2 bg-[#e74c3c] p-2  text-white">
                {errors.streetAddress.message}
              </p>
            )}
          </div>
          <div className="input-group mb-6 basis-full">
            <label htmlFor="city" className="mr-3">
              City
            </label>
            <input
              className="w-full disabled:border-0 disabled:bg-transparent disabled:pl-0 disabled:font-semibold"
              type="text"
              id="city"
              tabIndex="5"
              disabled={isFormDisable}
              {...register("city")}
            />
            {errors.city && (
              <p className="mt-2 bg-[#e74c3c] p-2  text-white">
                {errors.city.message}
              </p>
            )}
          </div>
        </div>
        <div className="input-groups sm:flex sm:justify-between sm:gap-4">
          <div className="input-group mb-6 basis-full ">
            <label htmlFor="state" classme="mr-3">
              State
            </label>
            <input
              className="w-full disabled:border-0 disabled:bg-transparent disabled:pl-0 disabled:font-semibold"
              type="text"
              id="state"
              tabIndex="6"
              disabled={isFormDisable}
              {...register("state")}
            />
            {errors.state && (
              <p className="mt-2 bg-[#e74c3c] p-2  text-white">
                {errors.state.message}
              </p>
            )}
          </div>
          <div className="input-group mb-6 basis-full">
            <label htmlFor="zipCode" className="mr-3">
              Zip Code
            </label>
            <input
              className="w-full disabled:border-0 disabled:bg-transparent disabled:pl-0 disabled:font-semibold"
              type="text"
              id="zipCode"
              tabIndex="7"
              disabled={isFormDisable}
              {...register("zipCode")}
            />
            {errors.zipCode && (
              <p className="mt-2 bg-[#e74c3c] p-2  text-white">
                {errors.zipCode.message}
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
              className="w-full  disabled:border-0 disabled:bg-transparent disabled:pl-0 disabled:font-semibold"
              type="tel"
              id="phoneNumber"
              tabIndex="10"
              disabled={isFormDisable}
              {...register("phoneNumber")}
            />

            {errors.phoneNumber && (
              <p className="mt-2 bg-[#e74c3c] p-2  text-white">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        </div>
        {!isFormDisable && (
          <button type="submit" className="btn btn-primary btn-full">
            Save Changes
          </button>
        )}
      </form>
      {isFormDisable && (
        <button
          type="button"
          className="btn btn-primary btn-full"
          onClick={() => setFormDisable((prevValue) => !prevValue)}>
          Edit Profile
        </button>
      )}
    </>
  );
}

export default ProfileInfo;
