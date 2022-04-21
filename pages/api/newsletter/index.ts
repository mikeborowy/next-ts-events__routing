import { DBMessage } from "../../../api/mongo/@types/dbMessage";
import { connectDatabase } from "../../../api/mongo/helpers";
import { insertDocument } from "../../../api/mongo/queries";
import { isValidEmail } from "../../../helpers/isValidEmail";
import { NewsletterModel } from "../../../models";
import { APIMessage } from "../@types";
import { APIRequest } from "../@types/APIRequest";
import { APIResponse } from "../@types/APIResponse";

type MessageType = "Invalid email" | "Invalid name";

const newsLetterAPIHandler = async (
  req: APIRequest,
  res: APIResponse<NewsletterModel, APIMessage | DBMessage, MessageType>
) => {
  if (req.method === "POST") {
    const { email } = req.body as NewsletterModel;

    if (!isValidEmail(email)) {
      res.status(422).json({
        data: null,
        message: "Failed",
        details: "Invalid email",
      });
      return;
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({
        message: "Failed to connect to database",
      });

      return;
    }

    try {
      await insertDocument<NewsletterModel>({
        client,
        collectionName: "newsletter",
        document: { email },
      });

      client.close();
    } catch (error) {
      res.status(500).json({
        message: "Inserting data failed",
      });

      return;
    }

    res.status(201).json({
      data: { email },
      message: "Signed Up!",
    });
  }
};

export default newsLetterAPIHandler;
