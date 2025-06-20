import { useFormContext, Controller } from "react-hook-form";

import { Select, InputLabel, FormControl, SxProps } from "@mui/material";
import { CSSProperties, ReactNode } from "react";

interface Props {
  name: string;
  children: ReactNode;
  disabled?: boolean;
  label?: string;
  multiple?: boolean;
  style?: CSSProperties;
  defaultValue?: string | number | string[] | number[];
}

const HFSelect = ({
  name,
  children,
  disabled,
  label,
  multiple,
  defaultValue,
  style,
  ...other
}: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            {...field}
            fullWidth
            error={!!error}
            value={multiple ? field.value || [] : field.value}
            disabled={disabled}
            multiple={multiple}
            label={label}
            style={style}
            {...other}
          >
            {children}
          </Select>
        </FormControl>
      )}
    />
  );
};

export default HFSelect;
