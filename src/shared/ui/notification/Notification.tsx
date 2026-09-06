import { useEffect, useRef, useState, type FC } from 'react';
import styles from './Notification.module.css';

export type NotificationType = 'success' | 'error' | 'info';

export type NotificationProps = {
  message: string | React.ReactNode;
  type: NotificationType;
  duration?: number;
  onClose?: () => void;
};

const Notification: FC<NotificationProps> = ({
  message,
  type,
  duration = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleClose = () => {
    if (isExiting) return;
    setIsExiting(true);
    // Ждём окончания анимации (400ms) и вызываем onClose
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 400);
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [duration]);

  if (!isVisible || !message) return null;

  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
  };

  return (
    <div
      className={`${styles.notification} ${styles[type]} ${isExiting ? styles.exiting : ''}`}
    >
      <div className={styles.content}>
        <span className={styles.icon}>{icons[type]}</span>
        <span className={styles.message}>{message}</span>
        <button
          className={styles.closeBtn}
          onClick={handleClose}
        >
          ✕
        </button>
      </div>
      <div
        className={styles.progressBar}
        style={{
          animationDuration: `${duration}ms`,
        }}
      />
    </div>
  );
};

export default Notification;