import { NextApiRequest } from "next";
import type { APIMethod } from "./APIMethod";

export type APIRequest<P = NextApiRequest["query"]> = NextApiRequest & {
  method: APIMethod;
  query: P;
};
