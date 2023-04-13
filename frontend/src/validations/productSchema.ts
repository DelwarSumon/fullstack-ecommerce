import * as yup from "yup";

export const productSchema = yup.object({
  title: yup.string().required(),
  price: yup.number().required().positive(),
  description: yup.string().required(),
  categoryId: yup.string().required(),
  // images: yup.mixed().test({
  //   test: (value) => value.length > 0,
  //   message: "File can not be empty",
  // }),
  
});
