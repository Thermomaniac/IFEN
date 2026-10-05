import type { ReactNode } from "react";
import { ArrowCornerIcon } from "@/components/icons";
import cta from "@/components/ui/CtaButton.module.css";
import styles from "./Form.module.css";

/** A real submit <button> drawn like CtaButton (label block + arrow block). */
export function SubmitButton({
  children,
  type = "submit",
  onClick,
  disabled,
}: {
  children: ReactNode;
  type?: "submit" | "button";
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${cta.cta} ${styles.submit}`}>
      <span className={cta.label}>{children}</span>
      <span className={cta.arrow}>
        <ArrowCornerIcon />
      </span>
    </button>
  );
}
