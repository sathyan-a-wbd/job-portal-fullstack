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

    .required("passward required")
    .min(6, "Password legnth minimum 6 chars"),
  confirmPassword: yup
    .string()

    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Password must match"),
  userType: yup.string().required("Select user type"),
});
