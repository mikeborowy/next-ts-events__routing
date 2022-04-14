export const API_MESSAGES = {
  OK: "This Works!",
  SUCCESS: "Success",
  SIGNED_UP: "Signed Up!",
  FAILED: "Failed",
  NOT_FOUND: "Not found",
  MISSING_FIELD: "Missing field",
} as const;

type Keys = keyof typeof API_MESSAGES;
export type APIMessage = typeof API_MESSAGES[Keys];
