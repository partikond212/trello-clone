import type { cardTagButton } from "@/entities/card/model/card";
import React, { type FC } from "react";
import styles from "./CardTag.module.css";
type CardTagProps = {
  CardTag: cardTagButton;
};
const CardTag: FC<CardTagProps> = ({ CardTag }) => {
  return (
    <span
      className={styles.cardTag}
      style={{ "--tag-color": CardTag.tagColor } as React.CSSProperties}
    >
      {CardTag.tagName}
    </span>
  );
};

export default CardTag;
