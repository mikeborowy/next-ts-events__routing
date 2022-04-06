import type { NextPage } from "next";
import { EventModel } from "../../models";
import { EventListItem } from "./event-list-item";
import classes from "./event-list.module.css";

type EventListProps = {
  events: EventModel[];
};

export const EventList: NextPage<EventListProps> = (props: EventListProps) => {
  const { events } = props;

  return (
    <div className={classes.list}>
      {events.map((event) => {
        return (
          <EventListItem
            key={event.id}
            date={event.date}
            eventId={event.id}
            image={event.image}
            location={event.location}
            title={event.title}
          />
        );
      })}
    </div>
  );
};
