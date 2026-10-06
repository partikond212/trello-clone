import { useState } from "react";
import styles from "./NotificationThumbButton.module.css";
const NotificationThumbButton = () => {
  const [isNotificationActive, setIsNotificationActive] = useState(false);
  return (
    <button
      onClick={() => setIsNotificationActive((prev) => !prev)}
      className={`${styles.settingsElementBtn} ${isNotificationActive ? styles.active : ""}`}
    >
      <div
        className={`${styles.thumb} ${isNotificationActive ? styles.active : ""}`}
      ></div>
    </button>
  );
};

export default NotificationThumbButton;
