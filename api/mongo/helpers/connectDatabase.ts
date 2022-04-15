import { MongoClient } from "mongodb";

export const connectDatabase = async () => {
  console.log();
  const url = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.wndjs.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

  const client = await MongoClient.connect(url);
  return client;
};
