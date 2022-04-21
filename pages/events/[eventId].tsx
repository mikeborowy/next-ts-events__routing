import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { fetchEventsAPI } from "../../api/firebase";
import { Comments } from "../../components/comments/comments";
import { EventContent } from "../../components/event-detail/event-content";
import { EventLogistics } from "../../components/event-detail/event-logistics";
import { EventSummary } from "../../components/event-detail/event-summary";
import { getEventById } from "../../helpers";
import { EventModel } from "../../models";

type EventDetailsPageProps = {
  event: EventModel;
};

const EventDetailsPage: NextPage<EventDetailsPageProps> = (
  props: EventDetailsPageProps
) => {
  const { event } = props;

  // if (!event) {
  //   return (
  //     <div className="center">
  //       <p>Loading...</p>;
  //     </div>
  //   );
  // }

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
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
      <Comments eventId={event.id} />
    </>
  );
};

interface Params extends ParsedUrlQuery {
  eventId: string;
}

export const getStaticProps: GetStaticProps<
  EventDetailsPageProps,
  Params
> = async (context) => {
  const eventId = context.params?.eventId ?? "";
  const events = await fetchEventsAPI();
  const event = getEventById(events, eventId);

  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      event,
    },
    revalidate: 30,
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const events = await fetchEventsAPI();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths,
    fallback: "blocking",
  };
};

export default EventDetailsPage;
