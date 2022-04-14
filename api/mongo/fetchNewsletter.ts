import { NewsletterModel } from "../../models";
import { APIMethod } from "../../pages/api/@types";

type OptionsType = {
  method: APIMethod;
  body?: NewsletterModel;
  params?: NewsletterModel;
};

export const fetchNewsletterAPI = async (
  options?: OptionsType
): Promise<NewsletterModel> => {
  try {
    const { method, body, params } = options ?? {};
    const urlParams = params ? `?${new URLSearchParams(params)}` : "";

    const init: RequestInit = {
      body: body && JSON.stringify(body),
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(`api/newsletter${urlParams}`, init);
    const jsonData = await response.json();
    const newsletter = jsonData.data;

    return newsletter;
  } catch (error) {
    throw new Error("Error: fetchNewsletter");
  }
};
