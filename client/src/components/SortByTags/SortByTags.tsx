"use client";
import React from "react";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
} from "@mui/material";
import { useAppSelector } from "@/src/hooks/reduxHooks";
import style from "./sortbytags.module.scss";

interface Props {
  direction?: "row" | "column";
  title?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SortByTags = ({ direction = "column", title, handleChange }: Props) => {
  const tags = useAppSelector((state) => state.tags.tags);

  return (
    <Box>
      {title && <Typography variant="h6">{title}</Typography>}
      <FormGroup
        sx={{
          "@media (max-width:700px)": {
            display: "flex",
            flexDirection: "row",
          },
        }}
      >
        {tags.map((tag) => (
          <FormControlLabel
            key={tag.name}
            control={<Checkbox onChange={handleChange} value={tag.name} />}
            label={tag.name}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default SortByTags;
