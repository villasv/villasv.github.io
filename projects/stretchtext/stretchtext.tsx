/**
 * Inspired by Ted Nelson's 1967 proposal on hypertext interactivity.
 */
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
  wrap: ReactNode;
}

export function StretchText({ wrap, children }: StretchTextProps) {
  const stretchSeconds = 0.8;
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
          className={styles.unlink}
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

/**
 * Like a regular p tag, but using span to mimic the visual characteristics of a
 * paragraph without restrictions on child elements.
 * @returns a span container with paragraph styling
 */
export function Paragraph({ children }: PropsWithChildren): React.JSX.Element {
  return <span className={styles.paragraph}>{children}</span>;
}

/**
 * Like a regular blockquote tag, but using span to mimic the visual
 * characteristics of a blockquote without restrictions on child elements.
 * @returns a span container with blockquote styling
 */
export function Blockquote({ children }: PropsWithChildren): React.JSX.Element {
  return <span className={styles.blockquote}>{children}</span>;
}

export function stretchable(
  short: ReactNode,
  long: ReactNode,
): React.JSX.Element {
  return <StretchText wrap={short}>{long}</StretchText>;
}
