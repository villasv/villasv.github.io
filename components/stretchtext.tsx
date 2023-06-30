"use client";

import { MouseEvent, PropsWithChildren, ReactNode, useState } from "react";
import styles from "./stretchtext.module.css";

export interface StretchTextProps extends PropsWithChildren {
  wrap: string;
}

/**
 * Inspired by Ted Nelson's 1967 proposal on hypertext interactivity.
 */
export function StretchText({ wrap, children }: StretchTextProps) {
  const [expanded, setExpanded] = useState(false);
  const onClickToggle = (event: MouseEvent) => {
    event.preventDefault(); // don't go anywhere
    setExpanded((expanded) => !expanded);
  };

  return (
    <span className={styles.telescopic}>
      {expanded ? (
        children
      ) : (
        <a href="" onClick={onClickToggle} className={styles.clickable}>
          {expanded ? children : wrap}
        </a>
      )}
    </span>
  );
}

export function stretchable(short: string, long: ReactNode): JSX.Element {
  return <StretchText wrap={short}>{long}</StretchText>;
}
