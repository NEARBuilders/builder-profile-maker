import React, { useState } from "react";
import { useProfileMaker } from "../../../contexts/profile-maker";

function toTitleCase(str) {
  return str
    .match(/[a-zA-Z0-9]+/g)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export default function BadgeSelect({ label, url }) {
  const profileMaker = useProfileMaker();
  const [isAdded, setIsAdded] = useState(
    profileMaker.data.tech.toString().includes(label)
  );
  function onClickFun() {
    if (isAdded) {
      setIsAdded(false);
      //   for()
      var badgeIndex = profileMaker.data.tech.indexOf(label);
      profileMaker.data.tech.splice(badgeIndex, 1);
      //   console.log(data);
    } else {
      setIsAdded(true);
      profileMaker.data.tech.push(toTitleCase(label));
      //   console.log(data);
    }
  }
  return (
    <>
      {isAdded ? (
        <div
          className="transition-scale m-2 flex cursor-pointer select-none items-center rounded-md bg-orange-400 text-zinc-900 shadow-md ring-orange-400/40 duration-200 ease-in-out hover:ring-1 active:scale-[0.98]"
          onClick={onClickFun}
        >
          <p className="p-1 px-2">{label}</p>
          <div className="h-full w-[1px] bg-gray-600 opacity-20"></div>
          <p className="px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 rounded-full"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </p>
        </div>
      ) : (
        <div
          className="transition-scale m-2 flex cursor-pointer select-none items-center rounded-md bg-orange-100 shadow-md ring-orange-100/40 duration-200 ease-in-out hover:ring-1 active:scale-[0.98im]"
          onClick={onClickFun}
        >
          <p className="p-1 px-2">{label}</p>
          <div className="h-full w-[1px] bg-gray-600 opacity-20"></div>
          <p className="px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </p>
        </div>
      )}
    </>
  );
}

// Template: <BadgeSelect label='' url={""}/>
