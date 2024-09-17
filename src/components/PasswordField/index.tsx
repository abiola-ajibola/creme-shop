import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { TFieldValues } from "@/pages/signup";

export function PasswordField({
  register,
  ...props
}: TextFieldProps & { register: UseFormRegister<TFieldValues> }) {
  const [showPassword, setShowpassword] = useState(false);
  return (
    <TextField
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Toggle password visibility"
              onClick={() => setShowpassword((show) => !show)}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
      {...register("password")}
      type={showPassword ? "text" : "password"}
    />
  );
}
