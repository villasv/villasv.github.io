"use client";

import { stretchable } from "@/projects/stretchtext/stretchtext";

const fulfilling = stretchable("fulfilling", <>fulfilling means what</>);

const To = stretchable(
  "To",
  <>
    {stretchable("We", <>All living creatures</>)}{" "}
    {stretchable("are meant", <>are given life</>)} to
  </>
);

const be = stretchable("be", <>be</>);
const happy = stretchable(
  "happy",
  <>
    to live a {fulfilling} and cheerful life full of wonders and stuff and so on
  </>
);

export default function Page() {
  return (
    <div>
      <h1>On Life, the Universe, and Everything</h1>
      <p>
        {To} {be} {happy}.
      </p>
    </div>
  );
}
