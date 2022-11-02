import { semantic } from "@constants/colors";

type ToastType = "error" | "info" | "success" | "warning";

export const getToastColor = (toastType: ToastType = "info"): string => {
  const colors: Record<ToastType, string> = {
    error: semantic.error,
    info: semantic.info,
    success: semantic.success,
    warning: semantic.warning,
  };

  return colors[toastType || "info"];
};
