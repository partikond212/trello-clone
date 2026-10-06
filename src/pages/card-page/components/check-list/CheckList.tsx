import type { Card } from "@/entities/card/model/card";
import { type FC } from "react";
import CheckListElement from "../check-list-element/CheckListElement";
import styles from "./CheckList.module.css";
type CheckListProps = {
  cardTasks: Card["tasks"];
  onToggle: (index: number) => void;
};
const CheckList: FC<CheckListProps> = ({ cardTasks, onToggle }) => {
  return (
    <ul className={styles.list}>
      {cardTasks?.map((task, index) => (
        <CheckListElement
          key={index}
          onToggle={() => onToggle(index)}
          taskTitle={task.taskTitle}
          isDone={task.isDone}
        />
      ))}
    </ul>
  );
};

export default CheckList;
