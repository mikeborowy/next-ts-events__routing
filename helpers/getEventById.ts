import { EventModel } from "../models";

export const getEventById = (events: EventModel[], eventId: string) => {
  return events.find((event) => event.id === eventId);
};
