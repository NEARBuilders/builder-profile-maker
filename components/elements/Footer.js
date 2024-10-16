import React from "react";
import { GITHUB_SVG, INSTAGRAM_SVG, LINKEDIN_SVG, X_SVG } from "./SVG";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex w-full flex-col items-center justify-center pb-2 pt-6">
      <div className="flex flex-row flex-wrap space-x-2">
        {/* X */}
        <a
          className="mb-1 mt-3 flex aspect-square w-max items-center rounded-full bg-blue-500 p-2 text-lg font-semibold uppercase text-blue-50 shadow outline-none transition-all duration-150 ease-linear hover:bg-blue-600 hover:shadow-md focus:outline-none"
          href="https://x.com/NearBuilders"
          target="_blank"
          rel="noopener noreferrer"
        >
          <X_SVG size={4} />
        </a>
        {/* GitHub */}
        <a
          className="mb-1 mr-1 mt-3 flex aspect-square w-max items-center rounded-full bg-violet-500 p-2 text-lg font-semibold uppercase text-violet-50 shadow outline-none transition-all duration-150 ease-linear hover:bg-violet-600 hover:shadow-md focus:outline-none"
          href="https://github.com/NEARBuilders"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GITHUB_SVG size={4} />
        </a>
        {/* LinkedIn */}
        <a
          className="mb-1 mr-1 mt-3 flex aspect-square w-max items-center rounded-full bg-blue-600 p-2 text-lg font-semibold uppercase text-blue-50 shadow outline-none transition-all duration-150 ease-linear hover:bg-blue-700 hover:shadow-md focus:outline-none"
          href="https://www.linkedin.com/company/nearbuilders"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LINKEDIN_SVG size={4} />
        </a>
      </div>
      {/* mail to */}
      <div className="flex w-full justify-center">
        <a
          href="mailto:contact@nearbuilders.com"
          className="mt-2 flex gap-1 text-base text-white opacity-75 transition-all ease-in-out hover:opacity-100"
          title="Contact us for any business, service or query."
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
          contact@nearbuilders.com
        </a>
      </div>
      <div className="flex w-full items-center justify-center text-orange">
        <p className="mt-2 text-center opacity-75 hover:opacity-95">
          Made with 💛 by{" "}
          <Link
            href="https://nearbuilders.org"
            target="_blank"
            className="underline"
          >
            Build DAO
          </Link>
          <br />
          Adapted from{" "}
          <Link href="https://itsvg.in/" target="_blank" className="underline">
            Vishwa Gaurav
          </Link>
          &apos;s{" "}
          <Link
            href="https://gprm.itsvg.in/"
            target="_blank"
            className="underline"
          >
            GPRM
          </Link>
        </p>
      </div>
    </div>
  );
}
