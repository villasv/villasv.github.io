"use client";

import { MouseEvent, PropsWithChildren, ReactNode, useState } from "react";
import styles from "./stretchtext.module.css";

enum StretchStatus {
  TENSE,
  SHRINKING,
  EXPANDING,
  LOOSE,
}

export interface StretchTextProps extends PropsWithChildren {
  wrap: string;
}

/**
 * Inspired by Ted Nelson's 1967 proposal on hypertext interactivity.
 */
export function StretchText({ wrap, children }: StretchTextProps) {
  const stretchSeconds = 5;
  const [status, setStatus] = useState(StretchStatus.TENSE);

  const onClickStretch = (event: MouseEvent) => {
    event.preventDefault(); // don't go anywhere
    setStatus(StretchStatus.SHRINKING);
    setTimeout(() => {
      setStatus(StretchStatus.EXPANDING);
    }, stretchSeconds * 1000);
    setTimeout(() => {
      setStatus(StretchStatus.LOOSE);
    }, stretchSeconds * 2000);
  };

  const wrapped = () =>
    [StretchStatus.TENSE, StretchStatus.SHRINKING].includes(status);

  return (
    <span className={styles.container}>
      {wrapped() ? (
        <a
          href=""
          onClick={onClickStretch}
          style={{ transition: `all ${stretchSeconds}s ease` }}
          className={[
            styles.tense,
            status === StretchStatus.SHRINKING ? styles.shrinking : "",
          ].join(" ")}
        >
          {wrap}
        </a>
      ) : (
        <span
          style={{ transition: `all ${stretchSeconds}s ease` }}
          className={[
            styles.loose,
            status === StretchStatus.EXPANDING ? styles.expanding : "",
          ].join(" ")}
        >
          {children}
        </span>
      )}
    </span>
  );
}

export function stretchable(short: string, long: ReactNode): JSX.Element {
  return <StretchText wrap={short}>{long}</StretchText>;
}
