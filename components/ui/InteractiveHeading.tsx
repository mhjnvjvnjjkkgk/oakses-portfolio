import React from "react";
import { InteractiveHoverLetter } from "./InteractiveHoverLetter";

interface InteractiveHeadingProps {
  text: string;
  className?: string;
}

export const InteractiveHeading: React.FC<InteractiveHeadingProps> = ({ text, className = "" }) => {
  return (
    <span className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}>
      {text.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex">
          {Array.from(word).map((char, charIndex) => (
            <InteractiveHoverLetter key={`${wordIndex}-${charIndex}`}>
              {char}
            </InteractiveHoverLetter>
          ))}
        </span>
      ))}
    </span>
  );
};
