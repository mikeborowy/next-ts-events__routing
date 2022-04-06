import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import AddressIcon from "../icons/address-icon";
import { Button } from "../button";
import classes from "./event-list-item.module.css";
import DateIcon from "../icons/date-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";

type EventListItemProps = {
  date: string;
  eventId: string;
  image: string;
  location: string;
  title: string;
};

export const EventListItem: NextPage<EventListItemProps> = (
  props: EventListItemProps
) => {
  const { date, eventId, image, location, title } = props;

  const formattedDate = new Date(date).toLocaleDateString("en-EN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAddress = location.replace(", ", "\n");

  return (
    <li className={classes.item}>
      <Image src={`/${image}`} alt={title} width={250} height={160} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{formattedDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={`/events/${eventId}`}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};
