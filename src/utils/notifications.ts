import { enqueueSnackbar, OptionsObject, SnackbarMessage } from "notistack";

const options: OptionsObject<"error" | "success" | "warning"> = {
  autoHideDuration: 5000,
  anchorOrigin: { horizontal: "center", vertical: "top" },
};
const enqueue = (
  opt: OptionsObject<"error" | "success" | "warning"> & {
    message: SnackbarMessage;
  },
) => enqueueSnackbar({ ...options, ...opt });

export function successNotification(message: string) {
  return enqueue({
    message: message,
    variant: "success",
  });
}

export function errorNotification(message: string) {
  return enqueue({
    message: message,
    variant: "error",
  });
}

export function warningNotification(message: string) {
  return enqueue({
    message: message,
    variant: "warning",
  });
}
