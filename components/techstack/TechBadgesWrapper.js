import React, { useState } from "react";
import BadgeSelect from "../elements/buttons/BadgeSelect";

export default function TechBadgesWrapper({
  label,
  data,
  defaultVisibleCount
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const badgeCount = isExpanded ? data.length : defaultVisibleCount;

  return (
    <>
      {data.length !== 0 && (
        <div className="my-6">
          <p className="flex justify-center text-lg md:text-xl">{label}</p>
          <div className="relative flex flex-col">
            {/* transition effect */}
            <div
              className="h-full overflow-hidden transition-all duration-200 ease-in-out"
              style={{ maxHeight: isExpanded ? "1000px" : "200px" }}
            >
              <div className="flex flex-row flex-wrap text-gray-700 md:max-w-[80vw] md:justify-center">
                {data.slice(0, badgeCount).map((badge, key) => (
                  <BadgeSelect key={key} label={badge.label} url={badge.url} />
                ))}
              </div>
            </div>
            {/* Gradient overlay for the hidden badges */}
            {!isExpanded && data.length > defaultVisibleCount && (
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent" />
            )}
          </div>
          {/* Show more/less button */}
          {data.length > defaultVisibleCount && (
            <div className="flex justify-center">
              <button
                className="mb-4 mt-2 cursor-pointer text-orange-300"
                onClick={() => setIsExpanded((prev) => !prev)}
              >
                {isExpanded ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
