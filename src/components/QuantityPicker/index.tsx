import { Box, Button, Input } from "@mui/material";
import { ChangeEvent } from "react";

export function QuantityPicker({
  decrementDisabled = false,
  onDecrement = () => {},
  onInputChange = () => {},
  inputValue = "",
  inputDisabled = false,
  incrementDisabled = false,
  onIncrement = () => {},
}: {
  decrementDisabled?: boolean;
  onDecrement?: () => void;
  // eslint-disable-next-line no-unused-vars
  onInputChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  inputValue?: string | number;
  inputDisabled?: boolean;
  incrementDisabled?: boolean;
  onIncrement?: () => void;
}) {
  return (
    <Box display="flex">
      <Button
        disabled={decrementDisabled}
        onClick={onDecrement}
        variant="contained"
      >
        -
      </Button>{" "}
      <Input
        onChange={onInputChange}
        inputProps={{
          className: "qty_input",
          style: { width: "4ch", textAlign: "center" },
        }}
        value={inputValue}
        disabled={inputDisabled}
      />{" "}
      <Button
        disabled={incrementDisabled}
        onClick={onIncrement}
        variant="contained"
      >
        +
      </Button>
    </Box>
  );
}
