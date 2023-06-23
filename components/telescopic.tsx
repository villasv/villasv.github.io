"use client";

import { MouseEvent, useState } from "react";
import styles from "./telescopic.module.css";

export interface TelescopicTextProps {
  wrap: React.ReactNode;
  children: React.ReactNode;
}

export function TelescopicText({ wrap, children }: TelescopicTextProps) {
  const [toggled, setToggle] = useState(false);
  const onClick = (event: MouseEvent) => {
    event.preventDefault(); // don't go anywhere
    setToggle((toggled) => !toggled);
  };

  return (
    <span>
      <a
        href=""
        onClick={onClick}
        className={toggled ? styles.clickable : styles.invisible}
      >
        {wrap}
      </a>
      <a
        href=""
        onClick={onClick}
        className={toggled ? styles.invisible : styles.clickable}
      >
        {children}
      </a>
    </span>
  );
}
