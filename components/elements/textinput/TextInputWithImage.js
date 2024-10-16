import React, { useEffect, useState } from "react";
import { useProfileMaker } from "../../../contexts/profile-maker";

export default function TextInputWithImage({ id, imgUrl, placeholder }) {
  const profileMaker = useProfileMaker();
  const [input, setInput] = useState(profileMaker.data.donate[id]);
  useEffect(() => {
    profileMaker.data.donate[id] = input;
  }, [input]);
  return (
    <div className="my-2 flex w-full md:w-10/12">
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="h-16 w-full border-b-2 border-orange-300 bg-transparent p-4 outline-none focus:z-10 focus:border-orange-200"
      />

      <label htmlFor={id} className="p-5">
        <span className="sr-only"> {id} </span>
        <img
          src={imgUrl}
          alt=""
          className="aspect-square w-12 rounded-md bg-orange-100 p-1"
        />
      </label>
    </div>
  );
}
