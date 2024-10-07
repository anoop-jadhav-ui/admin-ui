import { MouseEventHandler } from "react";
import styles from "./Checkbox.module.css";

interface CheckboxProps {
  ariaLabel?: string;
  checked: boolean;
  onClick: MouseEventHandler<HTMLInputElement>;
}

const Checkbox = ({ ariaLabel, checked, onClick }: CheckboxProps) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onClick={onClick}
      className={styles.checkbox}
      aria-label={ariaLabel}
    />
  );
};

export default Checkbox;
