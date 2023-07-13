import { nullable, z } from "zod";

const MAX_FILE_SIZE = 2000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp"
];

export const genericSchema = z.object({
  billingFirstName: z
    .string()
    .nonempty({ message: "This is a required field" }),
  billingLastName: z.string().nonempty({ message: "This is a required field" }),
  billingCountry: z.string().nonempty({ message: "This is a required field" }),
  billingStreetAddress: z
    .string()
    .nonempty({ message: "This is a required field" }),
  billingCity: z.string().nonempty({ message: "This is a required field" }),
  billingState: z.string().nonempty({ message: "This is a required field" }),
  billingZipCode: z.string().nonempty({ message: "This is a required field" }),
  email: z
    .string()
    .min(1, { message: "This is a required field" })
    .email("This is not a valid email."),
  confirmEmail: z.string().min(1, { message: "This is a required field" }),
  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid Phone Number" })
});

export const extendedSchema = z.object({
  billingFirstName: z
    .string()
    .nonempty({ message: "This is a required field" }),
  billingLastName: z.string().nonempty({ message: "This is a required field" }),
  billingCountry: z.string().nonempty({ message: "This is a required field" }),
  billingStreetAddress: z
    .string()
    .nonempty({ message: "This is a required field" }),
  billingCity: z.string().nonempty({ message: "This is a required field" }),
  billingState: z.string().nonempty({ message: "This is a required field" }),
  billingZipCode: z.string().nonempty({ message: "This is a required field" }),
  shippingFirstName: z
    .string()
    .nonempty({ message: "This is a required field" }),
  shippingLastName: z
    .string()
    .nonempty({ message: "This is a required field" }),
  shippingCountry: z.string().nonempty({ message: "This is a required field" }),
  shippingStreetAddress: z
    .string()
    .nonempty({ message: "This is a required field" }),
  shippingCity: z.string().nonempty({ message: "This is a required field" }),
  shippingState: z.string().nonempty({ message: "This is a required field" }),
  shippingZipCode: z.string().nonempty({ message: "This is a required field" }),
  sameAsShipping: z.literal(false),
  email: z
    .string()
    .min(1, { message: "This is a required field" })
    .email("This is not a valid email."),
  confirmEmail: z.string().min(1, { message: "This is a required field" }),
  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid Phone Number" })
});

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "This is a required field" })
    .email("This is not a valid email."),
  password: z.string().nonempty({ message: "This is a required field" })
});

export const registrationSchema = genericSchema
  .extend({
    username: z.string().nonempty({ message: "This is a required field" }),
    password: z
      .string()
      .nonempty({ message: "This is a required field" })
      .min(8, {
        message: "Password must be at least 8 characters long"
      })
      .regex(/^(?=.*[A-Z])(?=.*\d)/, {
        message:
          "Password must contain at least one uppercase letter and one number"
      })
  })
  .refine((data) => data.confirmEmail === data.email, {
    message: "Confirm email does not match with your email",
    path: ["confirmEmail"]
  });

export const basicInfoSchema = z.object({
  firstName: z.string().nonempty({ message: "This is a required field" }),
  lastName: z.string().nonempty({ message: "This is a required field" }),
  country: z.string().nonempty({ message: "This is a required field" }),
  streetAddress: z.string().nonempty({ message: "This is a required field" }),
  city: z.string().nonempty({ message: "This is a required field" }),
  state: z.string().nonempty({ message: "This is a required field" }),
  zipCode: z.string().nonempty({ message: "This is a required field" }),
  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid Phone Number" })
});

export const postFormSchema = z.object({
  title: z.string().nonempty({ message: "This is a required field" }),
  content: z.string().nonempty({ message: "This is a required field" }),
  postImage: z
    .any()
    .refine(
      (file) => file[0]?.size <= MAX_FILE_SIZE,
      `This is required and max image size is 5MB.`
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
});

export const postUpdateFormSchema = z.object({
  title: z.string().nonempty({ message: "This is a required field" }),
  content: z.string().nonempty({ message: "This is a required field" }),
  postImage: z
    .any()
    .refine(
      (file) => file.length === 0 || file[0]?.size <= MAX_FILE_SIZE,
      `This is required and max image size is 5MB.`
    )
    .refine(
      (file) =>
        file.length === 0 || ACCEPTED_IMAGE_TYPES.includes(file[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
});

export const contactSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This is a required field" })
    .email("This is not a valid email."),
  name: z.string().nonempty({ message: "This is a required field" }),
  phoneNumber: z.union([
    z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid Phone Number" })
      .nullish(),
    z.literal("")
  ]),
  messageContent: z.string().nonempty({ message: "This is a required field" })
});
