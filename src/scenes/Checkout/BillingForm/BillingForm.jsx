import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import PersonalInfo from "./PersonalInfo";
import ContactInfo from "./ContactInfo";
import { genericSchema, extendedSchema } from "../../../utils/formSchema";
import config from "../../../../config.json";
const { apiUrl } = config;

const apiOrderUrl = `${apiUrl}/orders`;
const extendedGenericSchema = genericSchema.extend({
  sameAsShipping: z.literal(true)
});

const formSchema = z
  .discriminatedUnion("sameAsShipping", [extendedGenericSchema, extendedSchema])
  .refine((data) => data.confirmEmail === data.email, {
    message: "Confirm email does not match with your email",
    path: ["confirmEmail"]
  });

function BillingForm({ activeStep, setActiveStep }) {
  const cart = useSelector((store) => store.cart.cart);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    trigger,
    clearErrors
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sameAsShipping: true
    }
  });

  const sameAsShippingWatcher = watch("sameAsShipping");

  const handleNextStep = async () => {
    const isValid = await trigger([
      "billingFirstName",
      "billingLastName",
      "billingCountry",
      "billingStreetAddress",
      "billingCity",
      "billingState",
      "billingZipCode",
      "shippingFirstName",
      "shippingLastName",
      "shippingCountry",
      "shippingStreetAddress",
      "shippingCity",
      "shippingState",
      "shippingZipCode"
    ]);
    if (isValid) {
      clearErrors();
      setActiveStep((prevValue) => prevValue + 1);
    }
  };

  const stripePromise = loadStripe("pk_test_YgapiRseDQ1Xp9IPWxrDdXPa");

  const makePayment = async (data) => {
    try {
      const stripe = await stripePromise;
      const requestBody = {
        username: [data.billingFirstName, data.billingLastName].join(""),
        email: data.email,
        products: cart.map(({ productId, count }) => ({ id: productId, count }))
      };

      const response = await fetch(apiOrderUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      });

      const session = await response.json();

      await stripe.redirectToCheckout({
        sessionId: session.stripeSession.id
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = (data) => {
    makePayment(data);
  };

  return (
    <div className="billing border bg-gray-100 py-10 px-6">
      <h2 className="sm:text-xlg font-body text-xl sm:text-gray-700">
        Billing Information
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {activeStep === 1 && (
          <>
            <PersonalInfo register={register} errors={errors} />
            <div className="input-group mb-6 mr-auto">
              <input
                className="mr-3 align-middle"
                type="checkbox"
                id="sameAsShipping"
                tabIndex="8"
                {...register("sameAsShipping")}
              />
              <label htmlFor="sameAsShipping" className="mr-3">
                Same for Shipping Address
              </label>
            </div>

            {!sameAsShippingWatcher && (
              <>
                <h2 className="sm:text-xlg mt-11 border-t border-gray-200 pt-7 font-body text-xl text-gray-700">
                  Shipping Information
                </h2>
                <PersonalInfo
                  register={register}
                  errors={errors}
                  type="shipping"
                />
              </>
            )}

            <button
              className="btn btn-primary btn-full"
              onClick={handleNextStep}>
              Proceed to Payment
            </button>

            <Link className="btn btn btn-full mt-4" to="/product-list">
              Continue Shopping
            </Link>
          </>
        )}

        {activeStep === 2 && (
          <>
            <ContactInfo register={register} errors={errors} />
            <button type="submit" className="btn btn-primary btn-full">
              Place Order
            </button>
            <button
              className="btn btn btn-full mt-4"
              onClick={() => setActiveStep(1)}>
              Back
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default BillingForm;
