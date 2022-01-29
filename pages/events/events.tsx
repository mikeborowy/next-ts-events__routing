import type { NextPage } from "next";
import { Router, useRouter } from "next/dist/client/router";
import { route } from "next/dist/next-server/server/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  EventsSearch,
  SearchEventType,
} from "../../components/event-detail/events-search";
import { EventList } from "../../components/events-list";
import { getAllEvents } from "../../data/dummy-data";

export const EventsPage: NextPage = () => {
  const router = useRouter();
  const events = getAllEvents();
  const onSearchEventHandler = (searchParams: SearchEventType) => {
    const { month, year } = searchParams;
    const url = `/events/${year}/${month}`;
    router.push(url);
  };

  return (
    <>
      <EventsSearch onSearch={onSearchEventHandler} />
      <EventList events={events} />
    </>
  );
};
