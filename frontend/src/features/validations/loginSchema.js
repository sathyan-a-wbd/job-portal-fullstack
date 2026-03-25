import * as yup from "yup";

export const loginSchema = yup.object({
  identifier: yup.string().required("Email or mobile number must"),
  password: yup.string().required("Password is must"),
});
