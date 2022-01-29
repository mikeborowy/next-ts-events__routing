import type { NextPage } from "next";
import Link from "next/link";
import { EventList } from "../../components/events-list";
import { getFeaturedEvents } from "../../data/dummy-data";

export const HomePage: NextPage = () => {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventList events={featuredEvents} />
    </div>
  );
};
