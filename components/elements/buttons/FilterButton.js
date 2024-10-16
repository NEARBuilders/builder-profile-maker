import React from "react";

export default function FilterButton({ title, onClick, chk }) {
  return (
    <button
      className={
        chk
          ? "m-2 rounded-sm bg-green-200 p-1 px-4 text-base text-green-900 ring-2 ring-green-900 transition-all duration-200 ease-in-out hover:ring-green-800 active:scale-95 md:m-0 md:ml-3"
          : "m-2 rounded-sm p-1 px-4 text-base ring-2 ring-green-300 transition-all duration-200 ease-in-out hover:ring-green-200 active:scale-95 md:m-0 md:ml-3"
      }
      onClick={onClick}
    >
      {title}
    </button>
  );
}
