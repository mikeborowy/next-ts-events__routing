import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { fetchEventsAPI } from "../api/firebase";
import { EventList } from "../components/events-list";
import { NewsletterRegistration } from "../components/newsletter-registration";
import { getFeaturedEvents } from "../helpers";
import { EventModel } from "../models";

type HomePageProps = {
  events: EventModel[];
};

const HomePage: NextPage<HomePageProps> = ({ events }) => {
  return (
    <div>
      <Head>
        <title>Next.js Event List</title>
        <meta name="description" content="Lorem ipsum dolorei" />
      </Head>
      <NewsletterRegistration />
      <EventList events={events} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<
  HomePageProps,
  ParsedUrlQuery
> = async () => {
  const events = await fetchEventsAPI();

  return {
    props: {
      events: getFeaturedEvents(events),
    },
    revalidate: 1800,
  };
};

export default HomePage;
