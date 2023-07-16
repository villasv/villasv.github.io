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
  const stretchSeconds = 0.5;
  const [status, setStatus] = useState(StretchStatus.TENSE);

  const onClickStretch = (event: MouseEvent) => {
    event.preventDefault(); // don't go anywhere
    setStatus(StretchStatus.SHRINKING);
    setTimeout(() => {
      setStatus(StretchStatus.EXPANDING);
      setTimeout(() => {
        setStatus(StretchStatus.LOOSE);
      }, 15);
    }, stretchSeconds * 1000);
  };

  const wrapped = () =>
    [StretchStatus.TENSE, StretchStatus.SHRINKING].includes(status);

  return (
    <span
      style={{ transition: `all ${stretchSeconds}s ease` }}
      className={[
        styles.container,
        {
          [StretchStatus.TENSE]: styles.tense,
          [StretchStatus.SHRINKING]: styles.shrinking,
          [StretchStatus.EXPANDING]: styles.expanding,
          [StretchStatus.LOOSE]: styles.loose,
        }[status],
      ].join(" ")}
    >
      {wrapped() ? (
        <a
          href=""
          onClick={onClickStretch}
          style={{ transition: `all ${stretchSeconds}s ease` }}
        >
          {wrap}
        </a>
      ) : (
        children
      )}
    </span>
  );
}

export function stretchable(short: string, long: ReactNode): JSX.Element {
  return <StretchText wrap={short}>{long}</StretchText>;
}
