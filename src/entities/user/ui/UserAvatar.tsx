import { type FC } from "react";
import type { User } from "../model/User";
import styles from "./UserAvatar.module.css";
type UserAvatarProps = {
  user: User | null;
  className?: string;
};
const UserAvatar: FC<UserAvatarProps> = ({ user, className }) => {
  if (!user) {
    return null;
  }
  const words = user.name.trim().split(/\s+/);
  const initials =
    words.length < 2
      ? user.name.trim().slice(0, 2).toUpperCase()
      : words
          .slice(0, 2)
          .map((w) => w[0])
          .join("")
          .toUpperCase();

  if (user.avatar) {
    return (
      <div>
        <img src={user.avatar} className={styles.customAvatar} alt="" />
      </div>
    );
  }

  return (
    <div className={`${styles.avatar} ${className ?? ""}`}>{initials}</div>
  );
};

export default UserAvatar;
