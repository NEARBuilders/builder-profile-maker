import React from "react";
import AnchorWithSVG from "../elements/anchor/AnchorWithSVG";

export default function SocialLinks() {
  return (
    <div className="my-8 flex flex-col-reverse text-orange-300 md:flex-row">
      <div className="my-6 flex w-full flex-col justify-center md:my-0 md:w-6/12 md:items-end">
        <p className="text-3xl font-medium sm:text-4xl md:text-5xl">
          Our Social Links
        </p>
        <p className="my-6 text-gray-500 md:pl-10 md:text-right md:text-lg 2xl:text-xl">
          We are available on X, LinkedIn, and GitHub. You can connect with us
          to get notification about any new feature we add, any cool product we
          create or get early access of some cool projects !
        </p>
        <div className="flex flex-row flex-wrap justify-center md:items-end">
          <AnchorWithSVG
            url="https://linkedin.com/in/VishwaGauravIn"
            title="LinkedIn"
          />
          <AnchorWithSVG url="https://x.com/VishwaGauravIn" title="X" />
          <AnchorWithSVG
            url="https://github.com/VishwaGauravIn"
            title="GitHub"
          />
          <AnchorWithSVG
            url="https://instagram.com/VishwaGauravIn"
            title="Instagram"
          />
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center md:w-6/12">
        <img
          src="/socials.svg"
          alt=""
          className="pointer-events-none aspect-square w-10/12 -rotate-3 select-none"
          draggable="false"
        />
      </div>
    </div>
  );
}
