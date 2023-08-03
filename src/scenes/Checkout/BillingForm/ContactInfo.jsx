function ContactInfo({ register, errors }) {
  return (
    <>
      <div className="input-group mb-6 basis-full">
        <label htmlFor="email" className="mr-3">
          Email
        </label>

        <input
          autoFocus
          className="w-full"
          type="text"
          id="email"
          tabIndex="1"
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
          type="text"
          id="confirmEmail"
          tabIndex="2"
          {...register("confirmEmail")}
        />

        {errors.confirmEmail && (
          <p className="mt-2 bg-[#e74c3c] p-2  text-white">
            {errors.confirmEmail.message}
          </p>
        )}
      </div>
      <div className="input-group mb-6 basis-full">
        <label htmlFor="phoneNumber" className="mr-3">
          Phone Number
        </label>

        <input
          className="w-full"
          type="tel"
          id="phoneNumber"
          tabIndex="3"
          {...register("phoneNumber")}
        />
        <small className="text-gray-500">
          Sample format{" "}
          <span className="font-semibold text-black">639054231234</span>
        </small>
        {errors.phoneNumber && (
          <p className="mt-2 bg-[#e74c3c] p-2  text-white">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>
    </>
  );
}

export default ContactInfo;
