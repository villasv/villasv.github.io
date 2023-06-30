"use client";

import { MouseEvent, ReactNode, useState } from "react";
import styles from "./telescopic.module.css";

export interface Writable {}

export interface TelescopicTextProps {
  wrap: ReactNode;
  children: ReactNode;
}

// see https://css-tricks.com/snippets/css/typewriter-effect/
export function TelescopicText({ wrap, children }: TelescopicTextProps) {
  const [expanded, setExpanded] = useState(false);
  const onClick = (event: MouseEvent) => {
    event.preventDefault(); // don't go anywhere
    setExpanded((expanded) => !expanded);
  };

  return (
    <a href="" onClick={onClick} className={styles.clickable}>
      {wrap}{children}
    </a>
  );
}
