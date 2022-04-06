import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { fetchEventsAPI } from "../../api";

import {
  EventsSearch,
  SearchEventType,
} from "../../components/event-detail/events-search";
import { EventList } from "../../components/events-list";
import { getFeaturedEvents } from "../../helpers";
import { EventModel } from "../../models";

type EventsPageProps = {
  events: EventModel[];
};

const EventsPage: NextPage<EventsPageProps> = (props) => {
  const router = useRouter();
  const { events } = props;

  const onSearchEventHandler = (searchParams: SearchEventType) => {
    const { month, year } = searchParams;
    const url = `/events/${year}/${month}`;
    router.push(url);
  };

  return (
    <>
      <Head>
        <title>Next.js Event List</title>
        <meta name="description" content="Lorem ipsum dolorei" />
      </Head>
      <EventsSearch onSearch={onSearchEventHandler} />
      <EventList events={events} />
    </>
  );
};

export const getStaticProps: GetStaticProps<
  EventsPageProps,
  ParsedUrlQuery
> = async () => {
  const events = await fetchEventsAPI();

  return {
    props: {
      events: getFeaturedEvents(events),
    },
    revalidate: 60,
  };
};

export default EventsPage;
