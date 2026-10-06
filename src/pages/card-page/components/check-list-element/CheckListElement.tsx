import { type FC } from "react";
import styles from "./CheckListElement.module.css";
import type { Task } from "@/entities/card/model/card";

type CheckListElementProps = Task & { onToggle: () => void };
const CheckListElement: FC<CheckListElementProps> = ({
  isDone,
  taskTitle,
  onToggle,
}) => {
  return (
    <li className={styles.item}>
      <label className={styles.label}>
        <input
          type="checkbox"
          checked={isDone}
          onChange={onToggle}
          className={styles.checkbox}
        />
        <span className={`${styles.text} ${isDone ? styles.done : ""}`}>
          {taskTitle}
        </span>
      </label>
    </li>
  );
};

export default CheckListElement;
