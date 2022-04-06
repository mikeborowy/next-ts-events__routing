import { useEffect, useState } from "react";
import { EventModel } from "../models";
import { fetchEventsAPI } from "../api/fetchEvents";

export const useEvents = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<EventModel[]>([]);
  const [error, setError] = useState<unknown>();
  const refetch = () => {
    setIsLoading(true);
    fetchEventsAPI()
      .then((data) => {
        const events = Object.entries(data).map(([_, event]) => event);
        setData(events);
        setIsLoading(false);
      })
      .catch((error) => setError(error));
  };

  useEffect(() => {
    refetch();
  }, []);

  return { isLoading, data, error, refetch };
};
