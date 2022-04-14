import type { NextApiResponse } from "next";
import type { APIMessage } from "./APIMessage";

export type APIResponseSchema<T = unknown, M = null, D = null> = {
  data?: T | null;
  message: M extends null ? APIMessage : M;
  details?: D;
};

export type APIResponse<T = unknown, M = null, D = null> = NextApiResponse<
  APIResponseSchema<T, M, D>
>;
