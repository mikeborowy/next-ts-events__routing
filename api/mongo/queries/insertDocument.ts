import { MongoClient, OptionalUnlessRequiredId } from "mongodb";
import { CollectionTypes } from "../@types/collectionsTypes";

type InsertDocumentType<T> = {
  client: MongoClient;
  collectionName: CollectionTypes;
  document: OptionalUnlessRequiredId<T>;
};

export const insertDocument = async <T>({
  client,
  collectionName,
  document,
}: InsertDocumentType<T>) => {
  const db = client.db();
  const result = await db.collection<T>(collectionName).insertOne(document);
  document._id = result.insertedId.toString();

  return document;
};
