import { ReactNode } from "react";
import classes from "./event-content.module.css";

interface EventContentProps {
  children: ReactNode;
}

export function EventContent(props: EventContentProps) {
  return <section className={classes.content}>{props.children}</section>;
}
