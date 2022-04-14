export const DB_MESSAGES = {
  OK: "This Works!",
  SUCCESS: "Success",
  SIGNED_UP: "Signed Up!",
  FAILED: "Failed",
  NOT_FOUND: "Not found",
  MISSING_FIELD: "Missing field",
  FAILED_TO_CONNECT_DB: "Failed to connect to database",
  DATA_INSERT_FAIL: "Inserting data failed",
  DATA_GET_FAIL: "Getting data failed",
} as const;

type Keys = keyof typeof DB_MESSAGES;
export type DBMessage = typeof DB_MESSAGES[Keys];
