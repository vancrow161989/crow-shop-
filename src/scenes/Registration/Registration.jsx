import RegistrationForm from "../../components/RegistrationForm";

function Registration() {
  return (
    <div className="container max-w-xl px-6 px-6 md:px-0 md:px-0">
      <div className="registration">
        <h2 className="mt-6 mb-6 text-center font-serif text-2xl md:mb-10 md:mt-20 md:text-4xl">
          Registration
        </h2>
        <RegistrationForm />
      </div>
    </div>
  );
}

export default Registration;
