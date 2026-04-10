import * as yup from "yup";

export const registerSchema = yup.object({
  fname: yup.string().required("Full name is required"),
  mail: yup.string().email("Enter valid email").required("Email is required"),
  mobile: yup
    .string()
    .required("Mobile is required")
    .matches(/^[0-9]{10}$/, "Mobile must be 10 digits"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password length minimum 6 chars"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
  userType: yup.string().default("jobseeker"),

  companyName: yup.string().when("userType", {
    is: "employer",
    then: (schema) =>
      schema.required("Company name is required for recruiters"),
    otherwise: (schema) => schema.notRequired(),
  }),
  companyLocation: yup.string().when("userType", {
    is: "employer",
    then: (schema) => schema.required("Location is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  comapanyEmail: yup
    .string()
    .email("Enter valid email")
    .required("Email is required")
    .when("userType", {
      is: "employer",
      then: (schema) =>
        schema.required("Company name is required for recruiters"),
      otherwise: (schema) => schema.notRequired(),
    }),
  description: yup.string().when("userType", {
    is: "employer",
    then: (schema) =>
      schema.required("Company name is required for recruiters"),
    otherwise: (schema) => schema.notRequired(),
  }),
  website: yup.string().url("Enter a valid URL (https://...)").notRequired(),
});
