import { Fragment, ReactNode } from "react";

import { MainNavigation } from "./main-navigation";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = (props: LayoutProps) => {
  return (
    <Fragment>
      <MainNavigation />
      <main>{props.children}</main>
    </Fragment>
  );
};
