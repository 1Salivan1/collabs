import * as yup from "yup";

export const schema = yup.object({
  title: yup
    .string()
    .min(2, "Назва повинна містити щонайменше 2 символ")
    .required("Назва обов’язкова"),
  tags: yup
    .array()
    .of(yup.number().required("Теги не можуть бути порожніми"))
    .min(1, "Виберіть хоча б один тег")
    .required("Виберіть хоча б один тег"),
  text: yup
    .string()
    .min(50, "Опис має містити щонайменше 50 символів")
    .required("Опис обов’язковий"),
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
  contactCheck: yup
    .mixed()
    .test("at-least-one-contact", "Вкажіть хоча б один контакт", function () {
      const { telegram, discord, linkedin } = this.parent;
      return telegram || discord || linkedin;
    }),
});
