import * as yup from "yup";

export const employerRegisterSchema = yup.object({
  fname: yup.string().required("Name is required"),
  mail: yup.string().email("Invalid email").required("Email required"),
  mobile: yup
    .string()
    .matches(/^[0-9]{10}$/, "Mobile must be 10 digits")
    .required("Mobile required"),
  password: yup.string().min(6).required("Password required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password required"),

  companyName: yup.string().required("Company name required"),
  companyLocation: yup.string().required("Location required"),
  companyEmail: yup
    .string()
    .email("Invalid company email")
    .required("Company email required"),
  description: yup.string(),
  website: yup.string().url("Invalid URL"),
});
