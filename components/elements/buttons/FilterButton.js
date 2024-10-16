import React from "react";

export default function FilterButton({ title, onClick, chk }) {
  return (
    <button
      className={
        chk
          ? "m-2 rounded-sm bg-orange-200 p-1 px-4 text-base text-orange-900 ring-2 ring-orange transition-all duration-200 ease-in-out hover:ring-orange active:scale-95 md:m-0 md:ml-3"
          : "m-2 rounded-sm p-1 px-4 text-base ring-2 ring-orange-300 transition-all duration-200 ease-in-out hover:ring-orange-200 active:scale-95 md:m-0 md:ml-3"
      }
      onClick={onClick}
    >
      {title}
    </button>
  );
}
