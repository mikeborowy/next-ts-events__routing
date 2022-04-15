import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { NotificationModel } from "../models";

type NotificationContextType = {
  notification: NotificationModel | null;
  showNotification: (notification: NotificationModel) => void;
  hideNotification: () => void;
};

const NotificationContext = createContext<NotificationContextType | null>(null);
NotificationContext.displayName = "NotificationContext";

interface NotificationProviderProps {
  children: ReactNode;
}

const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notification, setNotification] = useState<NotificationModel | null>(
    null
  );

  const showNotification = useCallback((notification: NotificationModel) => {
    setNotification(notification);
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(null);
  }, []);

  const value = useMemo(() => {
    return { notification, showNotification, hideNotification };
  }, [notification, showNotification, hideNotification]);

  useEffect(() => {
    if (
      notification &&
      (notification.status === "success" || notification.status === "error")
    ) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [notification]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }

  return context;
};

export { NotificationProvider, useNotificationContext };
