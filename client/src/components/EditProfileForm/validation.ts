import * as yup from "yup";

export const schema = yup.object({
  username: yup
    .string()
    .min(2, "Ім'я користувача не може бути порожнім")
    .required("Назва обов’язкова"),
  tags: yup
    .array()
    .of(yup.number().required("Виберіть хоча б один тег"))
    .min(1, "Виберіть хоча б один тег")
    .required("Виберіть хоча б один тег"),
  about: yup
    .string()
    .required("Опис не може бути порожнім")
    .min(50, "Мінімум 20 символів"),
  telegram: yup
    .string()
    .url("Введіть коректний URL Telegram")
    .optional()
    .nullable(),
  linkedin: yup
    .string()
    .url("Введіть коректний URL LinkedIn")
    .optional()
    .nullable(),
  discord: yup.string().optional().nullable(),
});
