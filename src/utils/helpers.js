import { siteLocale } from "../../config.json";

export function formatDate(value, locale = siteLocale) {
  return new Date(value).toLocaleDateString(locale);
}

export function formatTime(value, locale = siteLocale) {
  return new Date(value).toLocaleTimeString(locale);
}

export function userViewModel(formData) {
  return {
    username: formData.username,
    email: formData.email,
    password: formData.password,
    firstName: formData.billingFirstName,
    lastName: formData.billingLastName,
    country: formData.billingCountry,
    streetAddress: formData.billingStreetAddress,
    city: formData.billingCity,
    state: formData.billingState,
    zipCode: formData.billingZipCode,
    phoneNumber: formData.phoneNumber
  };
}
