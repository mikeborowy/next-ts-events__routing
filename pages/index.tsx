import Head from "next/head";
import type { GetStaticProps, NextPage } from "next";
import { EventList } from "../components/events-list";
import { EventModel } from "../models";
import { fetchEventsAPI } from "../api";
import { getFeaturedEvents } from "../helpers";
import { ParsedUrlQuery } from "querystring";
import React from "react";

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
