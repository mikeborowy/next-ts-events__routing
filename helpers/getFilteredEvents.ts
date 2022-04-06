import { EventModel } from "../models";

export const getFilteredEvents = (
  dateFilter: {
    year?: string | number;
    month?: string | number;
  },
  events?: EventModel[]
) => {
  if (!events || events.length === 0) {
    return [];
  }

  const { year, month } = dateFilter;

  let filteredEvents =
    events &&
    events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === Number(year) &&
        eventDate.getMonth() === Number(month) - 1
      );
    });

  return filteredEvents;
};
