import React from "react";

export default function AnchorWithSVG({ url, title, d }) {
  return (
    <a
      href={url}
      className="m-1.5 flex w-max items-center justify-center rounded-full bg-orange-300 p-3 px-6 font-semibold text-orange-900 shadow-lg transition-all duration-100 ease-in-out hover:scale-[1.02] hover:shadow-orange-300/30 sm:scale-100"
      target="_blank"
      rel="noopener noreferrer"
    >
      {title}&nbsp;
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className="mr-2 h-4 w-4"
        viewBox="0 0 16 16"
      >
        <path d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z" />
      </svg>
    </a>
  );
}
