import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { fetchEventsAPI } from "../../api/firebase";
import { Button } from "../../components/button";
import { ErrorAlert } from "../../components/error-alert/error-alert";
import { EventList } from "../../components/events-list";
import { ResultsTitle } from "../../components/results-title/results-title";
import { getFilteredEvents, isValidDate } from "../../helpers";
import { EventModel } from "../../models";

/** Server Side Props */

type FilteredEventsPageProps = {
  events: EventModel[];
  date: {
    year: number;
    month: number;
  };
  hasError: boolean;
};

const FilteredEventsPage: NextPage<FilteredEventsPageProps> = (
  props: FilteredEventsPageProps
) => {
  const {
    events,
    date: { year, month },
    hasError,
  } = props;

  if (hasError) {
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

export const getServerSideProps: GetServerSideProps<
  FilteredEventsPageProps,
  ParsedUrlQuery
> = async (context) => {
  const { params } = context;
  const filterData = params?.slug;

  const year = filterData?.[0];
  const month = filterData?.[1];

  const hasError = isValidDate(year, month);

  const events = await fetchEventsAPI();
  const filteredEvents = getFilteredEvents({ year, month }, events);

  return {
    props: {
      events: filteredEvents,
      date: {
        year: Number(year),
        month: Number(month),
      },
      hasError,
    },
  };
};

export default FilteredEventsPage;
