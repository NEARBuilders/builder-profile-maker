import React, { useEffect, useState } from "react";
import NextButton from "../elements/buttons/NextButton";
import Pagination from "../elements/Pagination";
import TextInputWithIcon from "../elements/textinput/TextInputWithIcon";
import TechStack from "./TechStack";
import { useProfileMaker } from "../../contexts/profile-maker";

export default function Socials({ back }) {
  const [isVisible, setIsVisible] = useState(false);
  const profileMaker = useProfileMaker();
  function onNext() {
    socials = "";
    if (document.getElementById("linkedin").value != "") {
      socials =
        socials +
        `[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://linkedin.com/in/${
          document.getElementById("linkedin").value
        }) `;
    }
    if (document.getElementById("telegram").value != "") {
      socials =
        socials +
        `[![Telegram](https://img.shields.io/badge/Telegram-%239146FF.svg?logo=Telegram&logoColor=white)](https://t.me/${
          document.getElementById("telegram").value
        }) `;
    }
    if (document.getElementById("x").value != "") {
      socials =
        socials +
        `[![X](https://img.shields.io/badge/X-black.svg?logo=X&logoColor=white)](https://x.com/${
          document.getElementById("x").value
        }) `;
    }
    if (document.getElementById("website").value != "") {
      socials =
        socials +
        `[![Website](https://img.shields.io/badge/Website-%239146FF.svg?logo=Telegram&logoColor=white)](https://tele.tv/${
          document.getElementById("website").value
        }) `;
    }
    setIsVisible(true);
  }
  return (
    <>
      {isVisible ? (
        <TechStack back={() => setIsVisible(false)} />
      ) : (
        <div className="fade-on-appear mt-10 flex flex-col items-center">
          <button
            className="absolute left-0 m-10 opacity-80 outline-none transition-all ease-in-out hover:opacity-100"
            onClick={back}
          >
            ◄ Go Back
          </button>
          <p className="mt-20 w-full text-center text-3xl">
            Add Your Social Links
          </p>
          <div className="my-10 flex w-full flex-wrap justify-between md:w-8/12">
            <TextInputWithIcon id="linkedin" placeholder="LinkedIn Username">
              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
            </TextInputWithIcon>
            <TextInputWithIcon id="telegram" placeholder="Telegram Username">
              <path d="M3.857 0 1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0H3.857zm9.714 7.429-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142v6.286z" />
              <path d="M11.857 3.143h-1.143V6.57h1.143V3.143zm-3.143 0H7.571V6.57h1.143V3.143z" />
            </TextInputWithIcon>
            <TextInputWithIcon id="x" placeholder="X Username">
              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
            </TextInputWithIcon>
            <TextInputWithIcon id="website" placeholder="Website">
              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
            </TextInputWithIcon>
          </div>
          <NextButton onClick={() => onNext()} />
          <Pagination val={3} />
        </div>
      )}
    </>
  );
}
export var socials = ``;
