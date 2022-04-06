import { ErrorAlert } from "../components/error-alert/error-alert";
import { EventModel } from "../models";

export const fetchEventsAPI = async (): Promise<EventModel[]> => {
  try {
    const response = await fetch(
      "https://nextjs-course-12061-default-rtdb.firebaseio.com/events.json"
    );

    const data = await response.json();

    const events: EventModel[] = [];

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const element = data[key];

        events.push({
          id: key,
          ...element,
        });
      }
    }

    return events;
  } catch (error) {
    throw new Error("Error: fetchEventsAPI");
  }
};
