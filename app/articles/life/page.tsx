"use client";

import {
  stretchable,
  Paragraph,
  Blockquote,
} from "@/projects/stretchtext/stretchtext";

const InspiredByHenryLucesVisionForTheLifeMagazine = stretchable(
  "Inspired by Henry Luce's vision for the LIFE magazine:",
  <span>
    <h2>Life: the magazine, the movie, the motto</h2>
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
    <Paragraph>
      LIFE was an influential all-photographic magazine published from 1936 to
      1972. It produced 1,864 consecutive weekly issues and in its prime it
      would come to sell more than 10 million copies a week, playing a
      historical role in photojournalism. Its founder Henry Robinson Luce had an
      ambitious vision for a picture book magazine he described on its
      prospectus quoted above, reflecting his thoughts on the purpose of human
      life itself.
    </Paragraph>
    <Paragraph>
      LIFE magazine condensed that vision statement into a most concise form:
    </Paragraph>
    <Blockquote>
      To see life. To see the world. To see strange things. To see and be
      amazed.
    </Blockquote>
    <Paragraph>
      That motto found its way into the 2013 movie "The Secret Life of Walter
      Mitty", which follows a daydreaming negative assets manager from LIFE
      magazine venturing into the world while the magazine itself nears its end
      with a last print issue. The movie portrays the LIFE magazine motto:
    </Paragraph>
    <Blockquote>
      To see the world, things dangerous to come to, to see behind walls, draw
      closer, to find each other, and to feel.
    </Blockquote>
    <Paragraph>
      Drawing from Henry Luce's vision, LIFE's historical motto and the movie
      adaptation, mixed to my own taste, is how I arrived at a life purpose that
      resonates with my own daydreaming.
    </Paragraph>
    <Paragraph>I want to</Paragraph>
  </span>
);

const ThatIsThePurposeOfLife = stretchable(
  <>That is the purpose of life.</>,
  <span>
    <br />
    <Paragraph>
      That is the purpose I've chosen to assign to my life. It's as legitimate
      as any other, but it appeals to me for its sense of fulfillment. It evokes
      an image of a life design that is rich, comprehensive, whole, complete.
    </Paragraph>
  </span>
);

export default function Page() {
  return (
    <div>
      <h1>On Life, the Universe, and Everything</h1>
      <Paragraph>
        {InspiredByHenryLucesVisionForTheLifeMagazine} to see life; to see the
        world; to witness great events; the faces of the poor and the gestures
        of the proud; to see strange things; to see humankind's work and
        discoveries; to see things far away, things hidden behind walls and
        within rooms; things dangerous to come to; to see and take pleasure in
        seeing; to see and be amazed; to see and be instructed; to draw closer,
        find each other, and to feel. {ThatIsThePurposeOfLife}
      </Paragraph>
    </div>
  );
}
