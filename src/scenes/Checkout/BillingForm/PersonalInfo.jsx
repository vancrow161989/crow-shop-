import { countriesList } from "../../../services/countryService";

function PersonalInfo({ register, errors, type = "billing" }) {
  const formattedName = (fieldName) => `${type}${fieldName}`;

  return (
    <>
      <div className="input-groups sm:flex sm:justify-between sm:gap-4">
        <div className="input-group mb-6 basis-full">
          <label htmlFor={formattedName("FirstName")} className="mr-3">
            First Name
          </label>

          <input
            className="w-full"
            type="text"
            id={formattedName("FirstName")}
            tabIndex="1"
            {...(type === "shipping"
              ? register(formattedName("FirstName"), {
                  shouldUnregister: true
                })
              : register(formattedName("FirstName")))}
          />

          {errors[formattedName("FirstName")] && (
            <p className="mt-2 bg-[#e74c3c] p-2  text-white">
              {errors[formattedName("FirstName")].message}
            </p>
          )}
        </div>
        <div className="input-group mb-6 basis-full">
          <label htmlFor={formattedName("LastName")} className="mr-3">
            Last Name
          </label>
          <input
            className="w-full"
            type="text"
            id={formattedName("LastName")}
            tabIndex="2"
            {...(type === "shipping"
              ? register(formattedName("LastName"), {
                  shouldUnregister: true
                })
              : register(formattedName("LastName")))}
          />
          {errors[formattedName("LastName")] && (
            <p className="mt-2 bg-[#e74c3c] p-2  text-white">
              {errors[formattedName("LastName")].message}
            </p>
          )}
        </div>
      </div>
      <div className="input-group mb-6">
        <label htmlFor={formattedName("Country")} className="mr-3">
          Country
        </label>
        <select
          className="w-full"
          name="country"
          id={formattedName("Country")}
          tabIndex="3"
          {...(type === "shipping"
            ? register(formattedName("Country"), {
                shouldUnregister: true
              })
            : register(formattedName("Country")))}>
          <option value="">Select Country</option>
          {countriesList.map((country) => (
            <option key={country.code} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        {errors[formattedName("Country")] && (
          <p className="mt-2 bg-[#e74c3c] p-2  text-white">
            {errors[formattedName("Country")].message}
          </p>
        )}
      </div>
      <div className="input-groups sm:flex  sm:justify-between sm:gap-4">
        <div className="input-group mb-6 basis-full">
          <label htmlFor={formattedName("StreetAddress")} className="mr-3">
            Street Address
          </label>
          <input
            className="w-full"
            type="text"
            id={formattedName("StreetAddress")}
            tabIndex="4"
            {...(type === "shipping"
              ? register(formattedName("StreetAddress"), {
                  shouldUnregister: true
                })
              : register(formattedName("StreetAddress")))}
          />
          {errors[formattedName("StreetAddress")] && (
            <p className="mt-2 bg-[#e74c3c] p-2  text-white">
              {errors[formattedName("StreetAddress")].message}
            </p>
          )}
        </div>
        <div className="input-group mb-6 basis-full">
          <label htmlFor="city" className="mr-3">
            City
          </label>
          <input
            className="w-full"
            type="text"
            id={formattedName("City")}
            tabIndex="5"
            {...(type === "shipping"
              ? register(formattedName("City"), {
                  shouldUnregister: true
                })
              : register(formattedName("City")))}
          />
          {errors[formattedName("City")] && (
            <p className="mt-2 bg-[#e74c3c] p-2  text-white">
              {errors[formattedName("City")].message}
            </p>
          )}
        </div>
      </div>
      <div className="input-groups sm:flex sm:justify-between sm:gap-4">
        <div className="input-group mb-6 basis-full ">
          <label htmlFor={formattedName("State")} className="mr-3">
            State
          </label>
          <input
            className="w-full"
            type="text"
            id={formattedName("State")}
            tabIndex="6"
            {...(type === "shipping"
              ? register(formattedName("State"), {
                  shouldUnregister: true
                })
              : register(formattedName("State")))}
          />
          {errors[formattedName("State")] && (
            <p className="mt-2 bg-[#e74c3c] p-2  text-white">
              {errors[formattedName("State")].message}
            </p>
          )}
        </div>
        <div className="input-group mb-6 basis-full">
          <label htmlFor={formattedName("ZipCode")} className="mr-3">
            Zip Code
          </label>
          <input
            className="w-full"
            type="text"
            id={formattedName("ZipCode")}
            tabIndex="7"
            {...(type === "shipping"
              ? register(formattedName("ZipCode"), {
                  shouldUnregister: true
                })
              : register(formattedName("ZipCode")))}
          />
          {errors[formattedName("ZipCode")] && (
            <p className="mt-2 bg-[#e74c3c] p-2  text-white">
              {errors[formattedName("ZipCode")].message}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default PersonalInfo;
