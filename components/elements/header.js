import React, { useEffect, useState } from "react";
import { RxCaretLeft } from "react-icons/rx";

export default function Header({ back, children }) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger when the user scrolls past 150px (adjust this value as needed)
      if (window.scrollY > 150) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div>
        <button
          className="absolute left-0 m-5 opacity-80 outline-none transition-all ease-in-out hover:opacity-100 md:m-10"
          onClick={back}
        >
          ◄ Go Back
        </button>

        {/* Sticky Button (only shows when scrolled past 150px) */}
        {isSticky && (
          <button
            className="fade-on-appear fixed left-0 top-2 m-5 flex scale-0 items-center justify-center rounded-full bg-gray-200 p-1 text-black opacity-100 transition-all ease-in-out hover:opacity-75 sm:scale-75 md:scale-100"
            onClick={back}
          >
            <RxCaretLeft size={35} />
          </button>
        )}
      </div>

      <div className="my-10 mt-28 flex w-full flex-col items-center gap-3 text-center md:mt-20">
        {children}
      </div>
    </>
  );
}
