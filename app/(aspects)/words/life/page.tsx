"use client";

import {
  stretchable,
  Paragraph,
  Blockquote,
} from "@/projects/stretchtext/stretchtext";

const LifeWasAStronglyPurposed = stretchable(
  <>LIFE was a strongly purposed</>,
  <>
    <Blockquote>
      THE PURPOSE: To see life; to see the world; to eyewitness great events; to
      watch the faces of the poor and the gestures of the proud; to see strange
      things - machines, armies, multitudes, shadows in the jungle and on the
      moon; to see our work - our paintings, towers and discoveries; to see
      things thousands of miles away, things hidden behind walls and within
      rooms, things dangerous to come to: the women that men love and many
      children; to see and to take pleasure in seeing; to see and be amazed; to
      see and be instructed; Thus to see, and to be shown, is now the will and
      new expectancy of half of humankind. To see, and to show, is the mission
      now undertaken by a new kind of publication, THE SHOW-BOOK OF THE WORLD,
      hereinafter described.
    </Blockquote>
    <Paragraph>That was the purpose of LIFE - an</Paragraph>
  </>,
);

const idealizedByHenryLuceAndPortrayedInABenStillerMovie = stretchable(
  <>
    idealized by Henry Luce and portrayed in a Ben Stiller movie from the
    2010's.
  </>,
  <>
    producing 1,864 consecutive weekly issues. In its prime it would come to
    sell more than 10 million copies a week, playing a historical role in
    photojournalism. Its founder Henry Robinson Luce had an ambitious vision for
    a picture book magazine he described in its prospectus quoted above,
    reflecting on the purpose of human life itself.
    <br />
    <h2>Universe of Mitty</h2>
    <Paragraph>
      That ideal found its way into the 2013 movie "The Secret Life of Walter
      Mitty", which follows a daydreaming negative assets manager from LIFE
      magazine venturing into the world while the magazine nears its end with a
      last print issue. Directed by and starring Ben Stiller, the movie
      adaptation of the LIFE magazine emphasizes its motto:
    </Paragraph>
    <Blockquote>
      To see the world, things dangerous to come to, to see behind walls, draw
      closer, to find each other, and to <em>feel</em>.
    </Blockquote>
    <Paragraph>
      The movie had a real imprint on me, in a way that I never forgot the
      feelings of adventure and warmth from that quote. When I later discovered
      the original vision of the real-world iconic LIFE, I vowed to never lose
      sight of that aspiration.
    </Paragraph>
  </>,
);

const InspiredByLIFE = stretchable(
  <>Inspired by LIFE:</>,
  <span>
    <h2>Life the magazine</h2>
    <Paragraph>
      {LifeWasAStronglyPurposed} influential photographic magazine published
      from 1936 to 1972 {idealizedByHenryLuceAndPortrayedInABenStillerMovie}
    </Paragraph>
    <h2>Everything there is</h2>
    <Paragraph>
      Drawing from Henry Luce's vision, LIFE's historical motif and modern
      adaptation, mixed to my tastes, I arrived at a life purpose formulation
      that resonates with my own inner world and its multitudes:
    </Paragraph>
    <Paragraph>-</Paragraph>
  </span>,
);

const ThatIsThePurposeOfLife = stretchable(
  <>That is the purpose of life.</>,
  <span>
    That is the purpose of life.
    <br />
    <Paragraph>
      <em>My</em> life, to be specific, and to each their own.
    </Paragraph>
  </span>,
);

export default function Page() {
  return (
    <div>
      <h1>⏳ Life, the Universe, and Everything</h1>
      <Paragraph>
        {InspiredByLIFE} To see life; to see the world; to witness great events;
        to know the faces of the poor and the gestures of the proud; to see
        strange things; to see humankind's work and discoveries; to see things
        far away, things hidden behind walls and within rooms; things dangerous
        to come to; to see and take pleasure in seeing; to see and be amazed; to
        see and be instructed; to draw closer, find each other, and to feel.{" "}
        {ThatIsThePurposeOfLife}
      </Paragraph>
    </div>
  );
}
