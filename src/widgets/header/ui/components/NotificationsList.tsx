import React, { useState, type FC } from "react";
import styles from "./NotificationsList.module.css";
type NotificationsListProps = {
  isOpen: boolean;
};
const NotificationsList: FC<NotificationsListProps> = ({ isOpen }) => {
  const [incomingNotifications, setIncomingNotifications] = useState("");
  if (!incomingNotifications) {
    return (
      <p className={isOpen ? styles.notificationsList : styles.hidden}>
        Здесь пусто!
      </p>
    );
  }

  return (
    <div className={isOpen ? styles.notificationsList : styles.hidden}></div>
  );
};

export default NotificationsList;
