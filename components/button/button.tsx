import Link from "next/link";
import React, { ReactNode, SyntheticEvent } from "react";
import classes from "./button.module.css";

type ButtonProps = {
  children?: ReactNode;
  link?: string;
  onClick?: (event: SyntheticEvent) => void;
};

export const Button = (props: ButtonProps) => {
  const { children, link, onClick } = props;
  if (link) {
    return (
      <Link href={link}>
        <a className={classes.btn}>{children}</a>
      </Link>
    );
  }

  return (
    <button className={classes.btn} onClick={onClick}>
      {children}
    </button>
  );
};
