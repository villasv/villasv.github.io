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
  </>
);

const idealizedByHenryLuceAndPortrayedInABenStillerMovie = stretchable(
  <>
    idealized by Henry Luce and portrayed in a Ben Stiller movie from the
    2010's.
  </>,
  <>
    producing 1,864 consecutive weekly issues. In its prime, it would come to
    sell more than 10 million copies a week, playing a historical role in
    photojournalism. Its founder, Henry Robinson Luce, had an ambitious vision
    for a picture book magazine he described in its prospectus, reflecting on
    the purpose of human life itself.
    <br />
    <Paragraph>
      That ideal found its way into the 2013 movie "The Secret Life of Walter
      Mitty", which follows a daydreaming photographic assets manager from LIFE
      magazine as he ventures into the world while the magazine nears its end
      with one last print issue. Directed by and starring Ben Stiller, the movie
      adaptation of the LIFE magazine emphasizes its motto:
    </Paragraph>
    <Blockquote>
      To see the world, things dangerous to come to, to see behind walls, draw
      closer, to find each other, and to <em>feel</em>.
    </Blockquote>
  </>
);

const InspiredByHenryLucesLIFE = stretchable(
  <>Inspired by Henry Luce's LIFE:</>,
  <span>
    <Paragraph>
      {LifeWasAStronglyPurposed} influential photographic magazine published
      from 1936 to 1972 {idealizedByHenryLuceAndPortrayedInABenStillerMovie}
    </Paragraph>
    <Paragraph>
      Drawing from Henry Luce's vision, LIFE's historical motif and modern
      adaptation, reworded and adapted to my tastes, here it goes, a motto I've
      committed to my heart:
    </Paragraph>
    <Paragraph>-</Paragraph>
  </span>
);

export default function Page() {
  return (
    <div>
      <h1>⏳ The Purpose of LIFE</h1>
      <Paragraph>
        {InspiredByHenryLucesLIFE} To experience the world; to witness great
        events; to comprehend the struggles of the poor and the ambitions of the
        powerful; to discover multitudes, things far away, things hidden behind
        walls, things dangerous to come to; to stay curious and to be
        instructed; to draw closer, to find each other, and to feel. That is the
        purpose of life.
      </Paragraph>
    </div>
  );
}
