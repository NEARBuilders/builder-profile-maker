import React, { Children } from "react";

export default function Header({ back, children }) {
  return (
    <>
      <button
        className="absolute left-0 m-5 opacity-80 outline-none transition-all ease-in-out hover:opacity-100 md:m-10"
        onClick={back}
      >
        ◄ Go Back
      </button>
      <div className="my-10 mt-28 flex w-full flex-col items-center gap-3 text-center md:mt-20">
        {children}
      </div>
    </>
  );
}
