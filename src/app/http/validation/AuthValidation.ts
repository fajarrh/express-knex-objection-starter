import * as yup from "yup";

export const loginSchema = (y: typeof yup) =>
  y.object().shape({
    email: y.string().email().required(),
    password: y.string().required(),
  });
export type LoginSchema = yup.InferType<ReturnType<typeof loginSchema>>;

export const registerSchema = (y: typeof yup) =>
  y.object().shape({
    name: y.string().required(),
    email: y.string().email().required(),
    phoneNumber: y.string().min(10).max(16).required(),
    password: y.string().required(),
  });
  export type RegisterSchema = yup.InferType<ReturnType<typeof registerSchema>>;
