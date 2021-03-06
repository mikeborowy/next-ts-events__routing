import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";

import { useEffect, useState } from "react";
import useSWR from "swr";

import { Button } from "../../components/button";
import { ErrorAlert } from "../../components/error-alert/error-alert";
import { EventList } from "../../components/events-list";
import { ResultsTitle } from "../../components/results-title/results-title";
import { isValidDate, getFilteredEvents } from "../../helpers";
import { EventModel } from "../../models";

/** Client Side Data Fetching */

const FilteredEventsPage: NextPage = () => {
  const [allEvents, setAllEvents] = useState<EventModel[]>();
  const router = useRouter();
  const filterData = router.query.slug as string[];

  const { data, error } = useSWR(
    "https://nextjs-course-12061-default-rtdb.firebaseio.com/events.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
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

      setAllEvents(events);
    }
  }, [data]);

  if (!allEvents) {
    return <p className="center">Loading ...</p>;
  }

  const [filteredYear, filteredMonth] = filterData;

  const year = +filteredYear;
  const month = +filteredMonth;

  if (isValidDate(year, month) || error) {
    return (
      <>
        <Head>
          <title>Filtered Events</title>
          <meta
            name="description"
            content={`Filtered Events: invalid filter`}
          />
        </Head>
        <ErrorAlert>
          <p className="center">Invalid filter ...</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </>
    );
  }

  const events = getFilteredEvents(
    {
      year,
      month,
    },
    allEvents
  );

  if (!events || events.length === 0) {
    return (
      <>
        <Head>
          <title>Filtered Events</title>
          <meta
            name="description"
            content={`Filtered Events for ${month}/${year} not found`}
          />
        </Head>
        <ErrorAlert>
          <p className="center">No events found.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </>
    );
  }

  const date = new Date(year, month - 1);

  return (
    <>
      <Head>
        <title>Filtered Events</title>
        <meta
          name="description"
          content={`Filtered Events for ${month}/${year}`}
        />
      </Head>
      <ResultsTitle date={date} />
      <EventList events={events} />
    </>
  );
};

export default FilteredEventsPage;
