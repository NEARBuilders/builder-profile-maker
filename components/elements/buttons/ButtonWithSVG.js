import React from "react";

export default function ButtonWithSVG({ title, d, onClick }) {
  return (
    <button
      className="group m-2 flex justify-center rounded-md border-2 border-orange-200 p-2 px-6 text-orange-200 shadow-md transition-all duration-200 ease-in-out hover:scale-[1.01] hover:border-orange-300 hover:text-orange-300 hover:shadow-orange-300/20 active:scale-[0.97]"
      onClick={onClick}
    >
      {title}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="ml-1 h-6 w-6 transition-all duration-200 ease-in-out group-hover:-rotate-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.6}
          d={d}
        />
      </svg>
    </button>
  );
}
