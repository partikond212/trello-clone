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
  let initials = user.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  if (user.name.split(" ").length < 2) {
    initials = user.name.trim().slice(0, 2).toUpperCase();
  } else if (user.avatar) {
    return (
      <div>
        <img src={user.avatar} className={styles.customAvatar} alt="" />
      </div>
    );
  } else {
    return (
      <div className={`${styles.avatar} ${className ?? className}`}>
        {initials}
      </div>
    );
  }
};

export default UserAvatar;
