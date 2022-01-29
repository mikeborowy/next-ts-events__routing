import { ReactNode } from "react";
import classes from "./error-alert.module.css";

type ErrorAlertProps = {
  children: ReactNode;
};

export const ErrorAlert = (props: ErrorAlertProps) => {
  const { children } = props;
  return <div className={classes.alert}>{children}</div>;
};
