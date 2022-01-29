import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { Button } from "../../components/button";
import { ErrorAlert } from "../../components/error-alert/error-alert";
import { EventList } from "../../components/events-list";
import { ResultsTitle } from "../../components/results-title/results-title";
import { getFilteredEvents } from "../../data/dummy-data";

const FilteredEventsPage: NextPage = () => {
  const router = useRouter();
  const filterData = router.query.slug as string[];

  if (!filterData) {
    return <p className="center">Loading ...</p>;
  }

  const [filteredYear, filteredMonth] = filterData;

  const year = +filteredYear;
  const month = +filteredMonth;

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  ) {
    return (
      <>
        <ErrorAlert>
          <p className="center">Invalid filter ...</p>;
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = getFilteredEvents({
    year,
    month,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
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
    <div>
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </div>
  );
};

export default FilteredEventsPage;
