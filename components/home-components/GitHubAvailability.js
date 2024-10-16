import React from "react";
import AnchorWithSVG from "../elements/anchor/AnchorWithSVG";
import { GITHUB_LOGO_LARGE_SVG } from "../elements/SVG";

export default function GitHubAvailability() {
  return (
    <div className="my-8 flex flex-col text-orange-300 md:flex-row">
      <div className="flex w-full flex-col items-center justify-center md:w-6/12">
        <GITHUB_LOGO_LARGE_SVG />
      </div>
      <div className="my-6 flex w-full flex-col justify-center md:my-0 md:w-6/12">
        <p className="text-3xl font-medium sm:text-4xl md:text-5xl">
          We&apos;re Open Source
        </p>
        <p className="my-6 text-gray-500 md:pr-10 md:text-lg 2xl:text-xl">
          Yes you heard right, this website is open source and you can find code
          of this website on GitHub. You can request a feature, contribute to
          project by adding feedbacks and mentioning bugs if they exist.
          Licensed under GPL-3.0 ©VishwaGauravIn
        </p>
        <AnchorWithSVG
          url="https://github.com/VishwaGauravIn/github-profile-readme-maker"
          title="Visit GitHub"
        />
      </div>
    </div>
  );
}
