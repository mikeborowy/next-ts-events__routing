import { CommentModel } from "../../models";
import { APIMethod } from "../../pages/api/@types";

type OptionsType = {
  method: APIMethod;
  body?: CommentModel;
  commentId?: string;
};

export const fetchCommentsAPI = async (
  options?: OptionsType
): Promise<CommentModel[]> => {
  try {
    const { method, body } = options ?? {};
    const init: RequestInit = {
      body: body && JSON.stringify(body),
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(
      "https://nextjs-course-12061-default-rtdb.firebaseio.com/comments.json",
      init
    );

    const jsonData = await response.json();

    const comments: CommentModel[] = [];

    for (const key in jsonData) {
      if (Object.prototype.hasOwnProperty.call(jsonData, key)) {
        const element = jsonData[key];

        comments.push({
          id: key,
          ...element,
        });
      }
    }

    return comments;
  } catch (error) {
    throw new Error("Error: fetchCommentsAPI");
  }
};
