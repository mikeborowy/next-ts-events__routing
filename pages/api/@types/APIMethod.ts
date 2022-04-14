const API_METHODS = ["POST", "GET", "DELETE", "PUT", "PATCH"] as const;

export type APIMethod = typeof API_METHODS[number];
