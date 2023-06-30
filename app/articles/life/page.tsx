"use client";

import { stretchable } from "@/components/stretchtext";

const fulfilling = stretchable(
  "fulfilling",
  <>fulfilling means what</>
);
const toBeHappy = stretchable(
  "to be happy",
  <>to live a {fulfilling} and cheerful life</>
);

export default function Page() {
  return (
    <div>
      <p>I want {toBeHappy}</p>
    </div>
  );
}
