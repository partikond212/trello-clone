import { type FC } from "react";
import styles from "./Modal.module.css";

export type ModalPropsType = {
  title: string;
  isOpen: boolean;
  children: React.ReactNode;
};
const Modal: FC<ModalPropsType> = ({ title, isOpen, children }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className={styles.overlay}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
