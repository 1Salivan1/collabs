"use client";
import React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Box, Button, MenuItem, Typography } from "@mui/material";
import HFSelect from "@/src/hook-form/HFSelect/HFSelect";
import HFInput from "@/src/hook-form/HFInput/HFInput";
import { useAppDispatch, useAppSelector } from "@/src/hooks/reduxHooks";
import { getMyProfile } from "@/src/redux/thunks/userThunk";

interface IFormInput {
  username: string;
  email: string;
  password: string;
  tags: number[];
  about: string;
  telegram?: string;
  linkedin?: string;
  discord?: string;
  contactCheck?: any;
}

const schema = yup.object().shape({
  username: yup.string().required("Ім'я обов'язкове"),
  email: yup
    .string()
    .email("Невірний формат email")
    .required("Email обов'язковий"),
  password: yup
    .string()
    .min(6, "Пароль повинен містити мінімум 6 символів")
    .required("Пароль обов'язковий"),
  tags: yup
    .array()
    .of(yup.number().required())
    .min(1, "Оберіть хоча б один тег")
    .required(),
  about: yup.string().required("Про себе обов'язково"),
  telegram: yup.string().url("Невірний формат URL").optional(),
  linkedin: yup.string().url("Невірний формат URL").optional(),
  discord: yup.string().optional(),
  contactCheck: yup
    .mixed()
    .test("at-least-one-contact", "Вкажіть хоча б один контакт", function () {
      const { telegram, discord, linkedin } = this.parent;
      return telegram || discord || linkedin;
    }),
});

const RegistrationForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const tags = useAppSelector((state) => state.tags.tags);

  const methods = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      tags: [],
      about: "",
      telegram: "",
      linkedin: "",
      discord: "",
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.API_BASE_URL}/auth/registration`,
        data
      );
      if (response.status === 200) {
        document.cookie = `token=${response.data.user.token}; max-age=2506000`;
        dispatch(getMyProfile());
        router.push("/personal");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        Object.entries(error.response.data).forEach(([key, msg]) => {
          setError(key as keyof IFormInput, {
            type: "manual",
            message: msg as string,
          });
        });
      } else {
        alert("Помилка реєстрації");
      }
    }
  };

  return (
    <Box sx={{ pr: "250px", pl: "250px", pt: "50px" }}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Реєстрація
          </Typography>
          <HFInput name="username" label={"Ім'я"} sx={{ mb: 2 }} />
          <HFInput name="email" type="email" label={"Email"} sx={{ mb: 2 }} />
          <HFInput
            name="password"
            type="password"
            label={"Пароль"}
            sx={{ mb: 2 }}
          />
          <HFSelect
            multiple
            name="tags"
            label="Мови програмування та інструменти"
          >
            {tags.map((tag) => (
              <MenuItem key={tag.id} value={tag.id}>
                {tag.name}
              </MenuItem>
            ))}
          </HFSelect>
          <HFInput
            name="about"
            label={"Розкажіть про себе"}
            multiline
            rows={4}
            sx={{ mb: 2, mt: 2 }}
          />
          <Box>
            <Typography variant="subtitle1">
              Контакти, (вкажіть 1 або більше на вибір)
            </Typography>
            <Box>
              <HFInput name="telegram" label={"Telegram link"} sx={{ mb: 2 }} />
              <HFInput name="linkedin" label={"Linkedin link"} sx={{ mb: 2 }} />
              <HFInput
                name="discord"
                label={"Discord nickname"}
                sx={{ mb: 2 }}
              />
            </Box>
            {errors.contactCheck &&
              typeof errors.contactCheck.message === "string" && (
                <Typography
                  color="error"
                  variant="caption"
                  sx={{ display: "block", mb: 2 }}
                >
                  {errors.contactCheck?.message}
                </Typography>
              )}
          </Box>
          <Button type="submit">Зареєструватися</Button>
          <Typography>Вже є аккаунт?</Typography>
          <Box>
            <Button
              href="/login"
              sx={{
                backgroundColor: "transparent",
                width: "auto",
                "&:hover": {
                  textDecoration: "underline",
                  textDecorationColor: "#4141af",
                  textDecorationThickness: "2px",
                },
              }}
            >
              Увійти
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};

export default RegistrationForm;
