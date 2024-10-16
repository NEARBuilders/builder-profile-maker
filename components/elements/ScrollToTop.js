import { ArrowUpIcon } from "@heroicons/react/outline";
import React from "react";

export default function ScrollToTop() {
  // When the user clicks on the button, scroll to the top of the document
  //   Smooth Varient
  function topFunction() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }
  return (
    <div className="flex w-full justify-center md:justify-end">
      <button
        className="rounded-full bg-orange-300 p-4 text-zinc-800 brightness-75 transition-all duration-200 ease-in-out hover:brightness-90 active:scale-95"
        onClick={() => topFunction()}
      >
        <ArrowUpIcon className="h-6 w-6" />
      </button>
    </div>
  );
}
