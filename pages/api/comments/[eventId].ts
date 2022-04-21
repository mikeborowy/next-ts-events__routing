import { MongoClient } from "mongodb";
import { CollectionTypes } from "../../../api/mongo/@types/collectionsTypes";
import { DBMessage } from "../../../api/mongo/@types/dbMessage";
import { connectDatabase } from "../../../api/mongo/helpers";
import { getAllDocuments, insertDocument } from "../../../api/mongo/queries";
import { isValidComment, isValidEmail, isValidName } from "../../../helpers";
import { CommentModel } from "../../../models";
import { APIMessage } from "../@types";
import { APIRequest } from "../@types/APIRequest";
import { APIResponse } from "../@types/APIResponse";

type DetailsMessageType =
  | "Invalid email"
  | "Invalid name"
  | "Invalid input"
  | CollectionTypes;

type CommentsQueryParams = { eventId: string };

const commentsAPIHandler = async (
  req: APIRequest<CommentsQueryParams>,
  res: APIResponse<
    CommentModel | CommentModel[],
    APIMessage | DBMessage,
    DetailsMessageType
  >
) => {
  const { eventId } = req.query;

  let client: MongoClient;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({
      message: "Failed to connect to database",
    });
    return;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (!isValidEmail(email) || !isValidName(name) || !isValidComment(text)) {
      res.status(422).json({ message: "Failed", details: "Invalid input" });
      client.close();
      return;
    }

    const newComment: CommentModel = {
      eventId,
      email,
      name,
      text,
    };

    let comment;

    try {
      comment = await insertDocument({
        client,
        collectionName: "comments",
        document: newComment,
      });
    } catch (error) {
      res.status(500).json({
        message: "Inserting data failed",
        details: "comments",
      });
    }

    res.status(201).json({ message: "Success", data: comment });
  }

  if (req.method === "GET") {
    let commentsList;

    try {
      commentsList = await getAllDocuments<CommentModel>({
        client,
        collectionName: "comments",
        filter: { eventId: eventId },
        sort: { _id: -1 },
      });
    } catch (error) {
      res.status(500).json({
        message: "Getting data failed",
        details: "comments",
      });
    }

    res.status(201).json({ message: "Success", data: commentsList });
  }

  client.close();
};

export default commentsAPIHandler;
