import { EventModel } from "../models";

export const getFeaturedEvents = (events: EventModel[]) => {
  return events.filter((event) => event.isFeatured);
};
