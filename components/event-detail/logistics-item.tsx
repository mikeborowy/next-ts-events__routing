import { Component, ReactElement, ReactNode } from "react";
import classes from "./logistics-item.module.css";

type LogisticsItemProps = {
  icon: ReactElement;
  children: ReactNode;
};
function LogisticsItem(props: LogisticsItemProps) {
  const { icon } = props;

  const Icon = () => icon as ReactElement;

  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span className={classes.content}>{props.children}</span>
    </li>
  );
}

export default LogisticsItem;
