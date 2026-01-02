import React from "react";
import { InteractiveHoverLetter } from "./InteractiveHoverLetter";

interface InteractiveHeadingProps {
  text?: string;        // Supporting legacy prop just in case
  title?: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export const InteractiveHeading: React.FC<InteractiveHeadingProps> = ({
  text,
  title,
  subtitle,
  align = "left",
  className = ""
}) => {
  // Determine the main heading text (title takes precedence, then text)
  const mainText = title || text || "";

  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  const containerAlign = alignmentClasses[align];

  return (
    <div className={`flex flex-col ${containerAlign} ${className}`}>
      {subtitle && (
        <span className="text-green-500 font-bold tracking-[0.2em] text-sm uppercase mb-4 block">
          {subtitle}
        </span>
      )}

      <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight ${align === 'center' ? 'mx-auto' : ''}`}>
        <span className="inline-flex flex-wrap gap-x-[0.25em] justify-inherit">
          {mainText.split(" ").map((word, wordIndex) => (
            <span key={wordIndex} className="inline-flex">
              {Array.from(word).map((char, charIndex) => (
                <InteractiveHoverLetter key={`${wordIndex}-${charIndex}`}>
                  {char}
                </InteractiveHoverLetter>
              ))}
            </span>
          ))}
        </span>
      </h2>
    </div>
  );
};
