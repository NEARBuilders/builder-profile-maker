import React, { useState } from "react";
import NextButton from "../elements/buttons/NextButton";
import Pagination from "../elements/Pagination";
import TextInputWithImage from "../elements/textinput/TextInputWithImage";
import { socials } from "./Socials";
import { githubstats } from "./GitHubCards";

import Preview from "./Preview";
import { useProfileMaker } from "../../contexts/profile-maker";

export default function Donate({ back }) {
  const [isVisible, setIsVisible] = useState(false);
  function onNext() {
    donate = "";
    if (document.getElementById("buymeacoffee").value != "") {
      donate =
        donate +
        `[![BuyMeACoffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/${
          document.getElementById("buymeacoffee").value
        }) `;
    }
    if (document.getElementById("paypal").value != "") {
      donate =
        donate +
        `[![PayPal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/${
          document.getElementById("paypal").value
        }) `;
    }
    if (document.getElementById("patreon").value != "") {
      donate =
        donate +
        `[![Patreon](https://img.shields.io/badge/Patreon-F96854?style=for-the-badge&logo=patreon&logoColor=white)](https://patreon.com/${
          document.getElementById("patreon").value
        }) `;
    }
    if (document.getElementById("kofi").value != "") {
      donate =
        donate +
        `[![Ko-Fi](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/${
          document.getElementById("kofi").value
        }) `;
    }
    createFinalData();
    setIsVisible(true);
  }

  const profileMaker = useProfileMaker();

  function createFinalData() {
    var finaldata = "";
    if (profileMaker.data.aboutme != ``) {
      finaldata =
        finaldata +
        `# 💫 About Me:
${profileMaker.data.aboutme.replace(/(?:\r\n|\r|\n)/g, "<br>")}

`;
    }
    if (socials != ``) {
      finaldata =
        finaldata +
        `
## 🌐 Socials:
${socials}
`;
    }
    if (profileMaker.data.tech != ``) {
      finaldata =
        finaldata +
        `
# 💻 Tech Stack:
${profileMaker.data.tech
  .join(" ")
  .replaceAll("for-the-badge", profileMaker.data.badge_theme)}
`;
    }
    finaldata = finaldata + githubstats;
    if (donate != ``) {
      finaldata =
        finaldata +
        `
  ## 💰 You can help me by Donating
  ${donate}

  `;
    }
    finaldata = `${finaldata}
<!-- Proudly created with GPRM ( https://gprm.itsvg.in ) -->`;
    profileMaker.data.finalData = finaldata;
  }

  return (
    <>
      {isVisible ? (
        <Preview back={() => setIsVisible(false)} />
      ) : (
        <div className="fade-on-appear flex flex-col items-center">
          <button
            className="absolute left-0 m-10 opacity-80 outline-none transition-all ease-in-out hover:opacity-100"
            onClick={back}
          >
            ◄ Go Back
          </button>
          <p className="my-10 mt-20 w-full text-center text-3xl">
            Let People Help You via Donations
          </p>
          <div className="flex w-full flex-col md:flex-row">
            <div className="flex w-full items-center justify-center md:w-6/12">
              <img
                src="/donate.svg"
                alt=""
                className="pointer-events-none aspect-square w-8/12 -rotate-3 select-none"
                draggable="false"
              />
            </div>
            <div className="flex w-full flex-col md:w-6/12">
              <p className="text-4xl font-semibold text-green-300 md:text-5xl">
                Donate :
              </p>
              <TextInputWithImage
                id="buymeacoffee"
                placeholder="Buy Me a Coffee Username"
                imgUrl="/bmc.svg"
              />
              <TextInputWithImage
                id="paypal"
                placeholder="PayPal.Me Username"
                imgUrl="/paypal.svg"
              />
              <TextInputWithImage
                id="patreon"
                placeholder="Patreon Username"
                imgUrl="/patreon.svg"
              />
              <TextInputWithImage
                id="kofi"
                placeholder="Ko-Fi Username"
                imgUrl="/kofi.svg"
              />
              <div className="mt-4 flex w-full justify-center md:w-10/12 md:justify-end">
                <NextButton onClick={() => onNext()} />
                <Pagination val={5} />
                {/* <FeedbackButton /> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export var donate = ``;
