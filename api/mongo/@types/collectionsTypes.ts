import { DATA_COLLECTIONS } from "../constants/collections";

type Keys = keyof typeof DATA_COLLECTIONS;
export type CollectionTypes = typeof DATA_COLLECTIONS[Keys];
