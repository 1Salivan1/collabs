"use client";
import HFInput from "@/src/hook-form/HFInput/HFInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, MenuItem, Snackbar } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { schema } from "./validation";
import { useAppDispatch, useAppSelector } from "@/src/hooks/reduxHooks";
import HFSelect from "@/src/hook-form/HFSelect/HFSelect";
import axios from "axios";
import getCookie from "@/src/utils/getCookie";
import { useRouter } from "next/navigation";
import { setUser } from "@/src/redux/slices/userSlice";
import HFMarkdownEditor from "@/src/hook-form/HFMarkdownEditor/HFMarkdownEditor";
import { useState } from "react";

function EditProfileForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const tags = useAppSelector((state) => state.tags.tags);
  const [snackbarIsOpen, setSnackbarIsOpen] = useState(false);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: user?.username,
      tags: user?.tags.map((tag: any) => tag.id),
      about: user?.about,
      telegram: user?.telegram,
      linkedin: user?.linkedin,
      discord: user?.discord,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${getCookie("token")}` },
      };
      const res = await axios.patch(
        `${process.env.API_BASE_URL}/user/${getCookie("token")}`,
        data,
        config
      );
      if (res.status === 200) {
        dispatch(setUser(res.data));
        setSnackbarIsOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HFInput style={{ marginBottom: 16 }} name="username" label="Ім'я" />
          <HFSelect
            style={{ marginBottom: 16 }}
            multiple
            name="tags"
            label="Теги"
          >
            {tags?.map((tag: any) => (
              <MenuItem key={tag.id} value={tag.id}>
                {tag.name}
              </MenuItem>
            ))}
          </HFSelect>
          <HFMarkdownEditor
            label="Опис"
            name="about"
            style={{ marginBottom: 16 }}
          />
          <HFInput
            style={{ marginBottom: 16 }}
            name="telegram"
            label="Telegram"
          />
          <HFInput
            style={{ marginBottom: 16 }}
            name="linkedin"
            label="Linkedin"
          />
          <HFInput
            style={{ marginBottom: 16 }}
            name="discord"
            label="Discord"
          />
          <Button type="submit" variant="contained" color="primary">
            Зберегти зміни
          </Button>
        </form>
      </FormProvider>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={6000}
        open={snackbarIsOpen}
        message={"Дані успішно змінено"}
        onClose={() => setSnackbarIsOpen(false)}
      />
    </>
  );
}

export default EditProfileForm;
