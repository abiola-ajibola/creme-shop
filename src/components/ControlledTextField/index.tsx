import { TextField, TextFieldProps } from "@mui/material";
import {
  Controller,
  UseControllerProps,
  FieldValues,
  // FieldError,
} from "react-hook-form";

interface Props extends UseControllerProps<FieldValues> {}

export function ControlledTextField<FieldValues>(
  props: Props & TextFieldProps & FieldValues,
) {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field }) => (
        <TextField
          {...props}
          {...field}
          onChange={(e) => {
            if (props.onChange) props.onChange(e);
            field.onChange(e);
          }}
        />
      )}
    />
  );
}
