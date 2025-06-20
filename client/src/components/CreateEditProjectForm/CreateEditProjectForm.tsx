"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Box, Button, Typography, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { schema } from "./validation";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import HFInput from "@/src/hook-form/HFInput/HFInput";
import HFSelect from "@/src/hook-form/HFSelect/HFSelect";
import HFMarkdownEditor from "@/src/hook-form/HFMarkdownEditor/HFMarkdownEditor";
import getCookie from "@/src/utils/getCookie";
import Loading from "@/src/UI/Loading/Loading";
import { useAppSelector } from "@/src/hooks/reduxHooks";
import { validateFormErrors } from "@/src/utils/validateFormErrors";

interface MyForm {
  id?: number;
  title: string;
  tags: number[];
  text: string;
  telegram?: string | null;
  discord?: string | null;
  linkedin?: string | null;
  contactCheck?: any;
}

const CreateEditProjectForm = () => {
  const router = useRouter();
  const { id } = useParams();
  const tags = useAppSelector((state) => state.tags.tags);
  const [loading, setLoading] = useState(false);

  const methods = useForm<MyForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      tags: [],
      text: "",
      telegram: "",
      discord: "",
      linkedin: "",
    },
  });

  const {
    formState: { errors },
  } = methods;

  console.log(errors);

  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        try {
          setLoading(true);
          const token = getCookie("token");
          const config = { headers: { Authorization: `Bearer ${token}` } };
          const response = await axios.get(
            `${process.env.API_BASE_URL}/project/${id}`,
            config
          );

          methods.reset({
            ...response.data.project,
            tags: response.data.project.tags.map(
              (tag: { id: number }) => tag.id
            ),
          });
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error(error);
        }
      };
      fetchProject();
    }
  }, [id, methods]);

  const { handleSubmit, setError } = methods;

  const onSubmit: SubmitHandler<MyForm> = async (data) => {
    try {
      const token = getCookie("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (id) {
        const response = await axios.patch(
          `${process.env.API_BASE_URL}/project/${id}`,
          data,
          config
        );
        if (response.status === 200) {
          router.push("/my_projects");
        }
        return;
      }

      const response = await axios.post(
        `${process.env.API_BASE_URL}/project`,
        data,
        config
      );
      if (response.status === 200) {
        router.push("/my_projects");
      }
    } catch (err: unknown) {
      validateFormErrors(err, setError);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <FormProvider {...methods}>
      <Box sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
        <Typography variant="h5" mb={2}>
          {id ? "Редагувати проєкт" : "Створити проєкт"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HFInput name="title" label="Назва" fullWidth sx={{ mb: 2 }} />
          <HFSelect multiple name="tags" label="Теги">
            {tags.map((tag) => (
              <MenuItem key={tag.id} value={tag.id}>
                {tag.name}
              </MenuItem>
            ))}
          </HFSelect>
          <HFMarkdownEditor name="text" label="Опис проєкту" />
          <Typography variant="h6">Контакти</Typography>
          <HFInput name="telegram" label="Telegram" fullWidth sx={{ mb: 2 }} />
          <HFInput name="discord" label="Discord" fullWidth sx={{ mb: 2 }} />
          <HFInput name="linkedin" label="LinkedIn" fullWidth sx={{ mb: 2 }} />
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
          <Button type="submit" variant="contained" color="primary">
            {id ? "Обновити проєкт" : "Створити проєкт"}
          </Button>
        </form>
      </Box>
    </FormProvider>
  );
};

export default CreateEditProjectForm;
