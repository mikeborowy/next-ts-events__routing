import { ECDH } from "crypto";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { ErrorAlert } from "../../components/error-alert/error-alert";
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import { getEventById } from "../../data/dummy-data";

const EventDetailsPage: NextPage = () => {
  const router = useRouter();
  const eventId = router.query.eventId as string;
  const event = getEventById(eventId);

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>;
      </ErrorAlert>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        address={event.location}
        date={event.date}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export default EventDetailsPage;
