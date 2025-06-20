"use client";
import dynamic from "next/dynamic";
import { Controller, useFormContext } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import React from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface Props {
  name: string;
  label?: string;
  style?: React.CSSProperties;
}

const HFMarkdownEditor = ({ name, label, style }: Props) => {
  const { control } = useFormContext();

  return (
    <Box sx={{ mb: 3, style }}>
      {label && (
        <Typography variant="body1" gutterBottom>
          {label}
        </Typography>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <MDEditor
            style={{ backgroundColor: "#454545", borderRadius: 10 }}
            value={field.value}
            onChange={(val) => field.onChange(val || "")}
            height={300}
          />
        )}
      />
    </Box>
  );
};

export default HFMarkdownEditor;
