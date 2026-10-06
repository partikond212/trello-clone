import { type FC } from "react";
import styles from "./ChooseTagButton.module.css";
type ChooseTagButtonProps = {
  tagName: string;
  tagColor: string;
  onToggle: () => void;
  isSelected: boolean;
};
const ChooseTagButton: FC<ChooseTagButtonProps> = ({
  tagName,
  tagColor,
  onToggle,
  isSelected,
}) => {
  return (
    <button
      onClick={onToggle}
      style={{ "--tag-color": tagColor } as React.CSSProperties}
      className={`${styles.chooseTagBtn} ${isSelected ? styles.isClicked : ""}`}
    >
      <div className={styles[tagColor]}></div>
      <span>{tagName}</span>
    </button>
  );
};

export default ChooseTagButton;
