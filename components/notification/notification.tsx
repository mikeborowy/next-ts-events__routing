import { useNotificationContext } from "../../contexts/notification.context";
import { StatusType } from "../../models";
import classes from "./notification.module.css";

type NotificationProps = {
  title: string;
  message: string;
  status: StatusType;
};

export const Notification = (props: NotificationProps) => {
  const { title, message, status } = props;
  const { hideNotification } = useNotificationContext();

  let statusClasses = "";

  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  if (status === "pending") {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};
