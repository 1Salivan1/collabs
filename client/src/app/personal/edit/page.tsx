"use client";
import EditProfileForm from "@/src/components/EditProfileForm/EditProfileForm";
import { Typography } from "@mui/material";

export default function EditPersonal() {
  return (
    <section style={{ paddingTop: 50 }}>
      <Typography variant="h4" style={{ marginBottom: 16 }}>
        Редагування профілю
      </Typography>
      <EditProfileForm />
    </section>
  );
}
