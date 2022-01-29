import { Button } from "../button";
import classes from "./results-title.module.css";

type ResultsTitleProps = { date: Date };

export const ResultsTitle = (props: ResultsTitleProps) => {
  const { date } = props;

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className={classes.title}>
      <h1>Events in {humanReadableDate}</h1>
      <Button link="/events">Show all events</Button>
    </section>
  );
};
