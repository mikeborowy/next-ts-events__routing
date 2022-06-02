import React, { ReactNode } from "react";
import { NotificationProvider } from "../../contexts/notification.context";

type AppProvidersProps = {
  children: ReactNode;
};

export const AppProviders = (props: AppProvidersProps) => {
  const { children } = props;
  return <NotificationProvider>{children}</NotificationProvider>;
};
