import { useFormContext, Controller } from "react-hook-form";

import { TextField, TextFieldProps } from "@mui/material";

interface Props extends Omit<TextFieldProps, "value" | "onChange"> {
  name: string;
}

const HFInput = ({ name, ...other }: Props) => {
  const { control } = useFormContext();

  const onWheel = (e: any) => e.target?.blur();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          value={
            (typeof field.value === "number" && field.value === 0) ||
            field.value === null
              ? ""
              : field.value
          }
          sx={{ color: "!important white" }}
          error={!!error}
          helperText={error?.message}
          {...other}
          onWheel={onWheel}
        />
      )}
    />
  );
};

export default HFInput;
