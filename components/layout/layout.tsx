import { Fragment, ReactNode } from "react";
import { useNotificationContext } from "../../contexts/notification.context";
import { Notification } from "../notification";
import { MainNavigation } from "./main-navigation";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = (props: LayoutProps) => {
  const { notification } = useNotificationContext();

  return (
    <Fragment>
      <MainNavigation />
      <main>{props.children}</main>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </Fragment>
  );
};
