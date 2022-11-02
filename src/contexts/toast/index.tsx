import { createContext, useCallback, useContext, useState } from "react";
import { Button } from "react-native-paper";

export type Toast = {
  duration?: number;
  onDismiss?: () => void;
  type?: "success" | "error" | "info" | "warning";
  // icon?: keyof typeof Feather.glyphMap;
  text: string;
  action?: Omit<React.ComponentProps<typeof Button>, "children"> & {
    label: string;
  };
};

export type ToastContextData = {
  showToast: (toast: Toast) => void;
  closeToast: () => void;
  isToastVisible: boolean;
  toast: Toast;
};

export const ToastContext = createContext<ToastContextData>(
  {} as ToastContextData
);

export const ToastProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const [toast, setToast] = useState<Toast>({} as Toast);

  const showToast = useCallback((toastInfo: Toast) => {
    setToast(toastInfo);
    setVisible(true);
  }, []);

  const closeToast = useCallback(() => {
    setToast({} as Toast);
    setVisible(false);
  }, []);

  return (
    <ToastContext.Provider
      value={{ showToast, isToastVisible: visible, toast, closeToast }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = (): ToastContextData => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToastContext must be used within an config Provider");
  }

  return context;
};
