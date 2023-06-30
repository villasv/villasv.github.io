"use client";

import { MouseEvent, PropsWithChildren, ReactNode, useState } from "react";
import styles from "./stretchtext.module.css";

enum StretchStatus {
  TERSE,
  FADING_TERSE,
  FADING_LOOSE,
  LOOSE,
}

export interface StretchTextProps extends PropsWithChildren {
  wrap: string;
}

/**
 * Inspired by Ted Nelson's 1967 proposal on hypertext interactivity.
 */
export function StretchText({ wrap, children }: StretchTextProps) {
  const [status, setStatus] = useState(StretchStatus.TERSE);

  const onClickStretch = (event: MouseEvent) => {
    event.preventDefault(); // don't go anywhere
    setStatus(StretchStatus.FADING_TERSE);
    setTimeout(() => {
      setStatus(StretchStatus.FADING_LOOSE);
    }, 200);
    setTimeout(() => {
      setStatus(StretchStatus.LOOSE);
    }, 400);
  };

  const unwrapped = () =>
    [StretchStatus.FADING_LOOSE, StretchStatus.LOOSE].includes(status);

  return (
    <span className={styles.container}>
      {unwrapped() ? (
        children
      ) : (
        <a
          href=""
          onClick={onClickStretch}
          className={[
            styles.terse,
            status === StretchStatus.FADING_TERSE ? styles.fadeOut : ''
          ].join(" ")}
        >
          {wrap}
        </a>
      )}
    </span>
  );
}

export function stretchable(short: string, long: ReactNode): JSX.Element {
  return <StretchText wrap={short}>{long}</StretchText>;
}
