import React from "react";
import { useForm } from "react-hook-form";
import { contactSchema } from "../../utils/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { addEmail } from "../../services/contactService";

function Contact() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (formData) => {
    await addEmail(formData);
    reset();
  };

  return (
    <div className="contact-wrap mb-28">
      <div className="container max-w-xl px-6 px-6 md:px-0 md:px-0">
        <div className="contact-form mt-10 mb-10 rounded border p-5 shadow-lg md:p-10">
          <h2 className="text-1xl text-center font-serif md:text-3xl">
            Let's Connect and Ignite Success!
          </h2>
          <p className="pb-6 text-center text-sm">
            Create exceptional user experiences with my expertise in modern web
            development. From sleek single-page apps to robust web platforms, I
            can transform your vision into reality. Contact me now to start our
            successful journey together.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-groups sm:flex sm:justify-between sm:gap-4">
              <div className="input-group mb-6 basis-full">
                <label htmlFor="phoneNumber" className="mr-3">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    autoFocus
                    className="w-full"
                    type="text"
                    id="email"
                    tabIndex="1"
                    {...register("email")}
                  />
                </div>

                {errors.email && (
                  <p className="mt-2 bg-[#e74c3c] p-2  text-white">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="input-group mb-6 basis-full">
                <label htmlFor="phoneNumber" className="mr-3">
                  Phone Number
                </label>

                <input
                  className="w-full  disabled:border-0 disabled:bg-transparent disabled:pl-0 disabled:font-semibold"
                  type="tel"
                  id="phoneNumber"
                  tabIndex="10"
                  {...register("phoneNumber")}
                />

                {errors.phoneNumber && (
                  <p className="mt-2 bg-[#e74c3c] p-2  text-white">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
            </div>
            <div className="input-groups sm:flex sm:justify-between sm:gap-4">
              <div className="input-group mb-6 basis-full">
                <label htmlFor="name" className="mr-3">
                  Name
                </label>

                <input
                  className="w-full disabled:border-0 disabled:pl-0 disabled:font-semibold"
                  type="text"
                  id="name"
                  tabIndex="2"
                  {...register("name")}
                />

                {errors.name && (
                  <p className="mt-2 bg-[#e74c3c] p-2  text-white">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>
            <div className="input-group mb-6">
              <label htmlFor="messageContent" className="mr-3">
                Message
              </label>
              <textarea
                rows="4"
                className="w-full pr-12 pl-3 text-base text-gray-600"
                tabIndex="3"
                id="messageContent"
                maxLength={450}
                {...register("messageContent")}
              />
              {errors.messageContent && (
                <p className="mt-2 bg-[#e74c3c] p-2  text-white">
                  {errors.messageContent.message}
                </p>
              )}
            </div>
            <button type="submit" className="btn btn-primary btn-full">
              Send Email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
