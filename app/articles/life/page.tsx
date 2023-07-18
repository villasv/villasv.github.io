"use client";

import {
  stretchable,
  Paragraph,
  Blockquote,
} from "@/projects/stretchtext/stretchtext";

const InspiredByHenryLucesLIFE = stretchable(
  <>Inspired by Henry Luce's LIFE:</>,
  <span>
    <h2>Life: the magazine</h2>
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
      That was the purpose of LIFE - an influential all-photographic magazine
      published from 1936 to 1972,{" "}
      {stretchable(
        <>
          as idealized by Henry Luce and divulged in a Ben Stiller movie from
          the 2010's.
        </>,
        <>
          producing 1,864 consecutive weekly issues. In its prime it would come
          to sell more than 10 million copies a week, playing a historical role
          in photojournalism. Its founder Henry Robinson Luce had an ambitious
          vision for a picture book magazine he described on its prospectus
          quoted above, reflecting on the purpose of human life itself.
          <br />
          <Paragraph>
            That ideal found its way into the 2013 movie "The Secret Life of
            Walter Mitty", which follows a daydreaming negative assets manager
            from LIFE magazine venturing into the world while the magazine nears
            its end with a last print issue. Directed and starred by Ben
            Stiller, the movie adaptation of the LIFE magazine emphasizes its
            motto:
          </Paragraph>
          <Blockquote>
            To see the world, things dangerous to come to, to see behind walls,
            draw closer, to find each other, and to <em>feel</em>.
          </Blockquote>
          <Paragraph>
            That movie had a real imprint on me, in a way that I never forgot
            the feelings of adventure, curiosity and warmth from that quote.
            When I later discovered the original vision of the real world iconic
            LIFE, it was even more touching. I vowed to never lose sight of that
            aspiration.
          </Paragraph>
        </>
      )}
    </Paragraph>
    <Paragraph>
      Drawing from Henry Luce's vision, LIFE's historical motif and modern
      adaptation, mixed to my own taste, I arrived at a life purpose formulation
      that resonates with my own daydreaming.
    </Paragraph>
    <Paragraph>I want to</Paragraph>
  </span>
);

const ThatIsThePurposeOfLife = stretchable(
  <>That is the purpose of life.</>,
  <span>
    That is the purpose of life.
    <br />
    <Paragraph>
      <em>My</em> life, to be specific. It's a purpose as legitimate as any
      others might have. It appeals to me, for its sense of fulfillment. It
      evokes an image of a life design that is rich, comprehensive, whole,
      complete. Yours doesn't have to be the same. It probably shouldn't be the
      same.
    </Paragraph>
  </span>
);

export default function Page() {
  return (
    <div>
      <h1>⏳ Life, the Universe, and Everything</h1>
      <Paragraph>
        {InspiredByHenryLucesLIFE} to see life; to see the world; to witness
        great events; the faces of the poor and the gestures of the proud; to
        see strange things; to see humankind's work and discoveries; to see
        things far away, things hidden behind walls and within rooms; things
        dangerous to come to; to see and take pleasure in seeing; to see and be
        amazed; to see and be instructed; to draw closer, find each other, and
        to feel. {ThatIsThePurposeOfLife}
      </Paragraph>
    </div>
  );
}
