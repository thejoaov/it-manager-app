export type ApiError = {
  rule: string;
  field: string;
  message: string;
  args?: { minLength?: number };
};
