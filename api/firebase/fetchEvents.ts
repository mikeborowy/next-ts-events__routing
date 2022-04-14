import { EventModel } from "../models";

export const fetchEventsAPI = async (): Promise<EventModel[]> => {
  try {
    const response = await fetch(
      "https://nextjs-course-12061-default-rtdb.firebaseio.com/events.json"
    );

    const jsonData = await response.json();

    const events: EventModel[] = [];

    for (const key in jsonData) {
      if (Object.prototype.hasOwnProperty.call(jsonData, key)) {
        const element = jsonData[key];

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
