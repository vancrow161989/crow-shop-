import { useState } from "react";
import { Link } from "react-router-dom";
import Stepper from "../../components/Stepper";
import CartSummary from "./CartSummary/CartSummary";
import BillingForm from "./BillingForm/BillingForm";

function Checkout() {
  const [activeStep, setActiveStep] = useState(1);

  const stepTitles = [
    { number: 1, label: "Billing" },
    { number: 2, label: "Payment" }
  ];
  
  return (
    <div className="checkout m:py-16 py-11 px-4 md:px-0">
      <div className="container">
        <h1 className="logo text-capitalize mx-auto mb-11 text-center font-serif text-lg font-bold sm:mb-16">
          <Link to="/">CROW SHOP</Link>
        </h1>
        <Stepper stepTitles={stepTitles} activeStep={activeStep} />
        <div className="mx-auto mt-20 flex max-w-6xl flex-col-reverse gap-14 lg:flex-row ">
          <div className="lg:w-7/12">
            <BillingForm
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          </div>
          <div className="lg:w-5/12">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
