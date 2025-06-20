"use client";
import React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, Typography } from "@mui/material";
import HFInput from "@/src/hook-form/HFInput/HFInput";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/src/hooks/reduxHooks";
import { getMyProfile } from "@/src/redux/thunks/userThunk";

interface ILoginForm {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Невірний формат email")
    .required("Email обов'язковий"),
  password: yup
    .string()
    .min(6, "Пароль повинен містити мінімум 6 символів")
    .required("Пароль обов'язковий"),
});

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const methods = useForm<ILoginForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    setError,
  } = methods;

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.API_BASE_URL}/auth/login`,
        data
      );

      if (response.data.status === 200) {
        document.cookie = `token=${response.data.token}; max-age=2506000`;
        dispatch(getMyProfile());
        router.push("/personal");
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        console.log(error);

        setError("email", {
          type: "manual",
          message: error.response.data.data.message || "Помилка входу",
        });
      } else {
        alert("Помилка входу");
      }
    }
  };

  return (
    <Box sx={{ pr: "250px", pl: "250px", pt: "50px" }}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Вхід
          </Typography>
          <HFInput
            name="email"
            type="email"
            label={"Email"}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ mb: 2 }}
          />
          <HFInput
            name="password"
            type="password"
            label={"Пароль"}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{ mb: 2 }}
          />
          <Button type="submit">Увійти</Button>
          <Typography>Немає аккаунту?</Typography>
          <Box>
            <Button
              href="/register"
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
              Зареєструватися
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};

export default LoginForm;
