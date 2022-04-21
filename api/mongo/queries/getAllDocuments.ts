import { Filter, MongoClient, Sort } from "mongodb";
import { CollectionTypes } from "../@types/CollectionsTypes";

type InsertDocumentType<T> = {
  client: MongoClient;
  collectionName: CollectionTypes;
  filter?: Filter<T>;
  sort?: Sort;
};

export const getAllDocuments = async <T>({
  client,
  collectionName,
  filter,
  sort,
}: InsertDocumentType<T>) => {
  const db = client.db();

  const documentsList = await db
    .collection<T>(collectionName)
    .find(filter ?? {})
    .sort(sort ?? {})
    .toArray();

  return documentsList;
};
