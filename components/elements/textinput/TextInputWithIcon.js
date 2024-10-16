import React, { useEffect, useState } from "react";
import { useProfileMaker } from "../../../contexts/profile-maker";

export default function TextInputWithIcon({
  id,
  children,
  placeholder,
  viewBox = "-0.5 0 20 16"
}) {
  const profileMaker = useProfileMaker();
  const [input, setInput] = useState(profileMaker.data.socials[id]);
  useEffect(() => {
    profileMaker.data.socials[id] = input;
  }, [input]);
  return (
    <div className="my-2 flex w-full md:w-5/12">
      <input
        type="text"
        id={id}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        className="h-16 w-full border-b-2 border-green-300 bg-transparent p-4 outline-none focus:z-10 focus:border-green-200"
      />

      <label htmlFor={id} className="p-5">
        <span className="sr-only"> {id} </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox={viewBox}
          stroke="currentColor"
          aria-hidden="true"
          className="h-8 w-8 text-green-300 opacity-75"
        >
          {children}
        </svg>
      </label>
    </div>
  );
}
