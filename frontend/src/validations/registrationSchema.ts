import * as yup from "yup";

export const registrationSchema = yup.object({
  name: yup.string().required().min(5).max(20),
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .required()
    .matches(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,20}$/,
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      "Minimum 6 characters, at least one uppercase letter, one lowercase letter, one number and one special character"
    )
    .min(6)
    .max(20),
  re_password: yup.string().oneOf([yup.ref("password")]),
  avatar: yup.mixed().test({
    test: (value) => value.length > 0,
    message: "File can not be empty",
  }),
});
