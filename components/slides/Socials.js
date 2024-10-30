import React, { useState } from "react";
import NextButton from "../elements/buttons/NextButton";
import Pagination from "../elements/Pagination";
import TextInputWithIcon from "../elements/textinput/TextInputWithIcon";
import TechStack from "./TechStack";
import Header from "../elements/header";

export default function Socials({ back }) {
  const [isVisible, setIsVisible] = useState(false);
  function onNext() {
    socials = "";
    if (document.getElementById("linkedin").value != "") {
      socials =
        socials +
        `- [LinkedIn](https://linkedin.com/in/${
          document.getElementById("linkedin").value
        })\n`;
    }
    if (document.getElementById("telegram").value != "") {
      socials =
        socials +
        `- [Telegram](https://t.me/${
          document.getElementById("telegram").value
        })\n`;
    }
    if (document.getElementById("x").value != "") {
      socials =
        socials +
        `- [X](https://x.com/${document.getElementById("x").value})\n`;
    }
    if (document.getElementById("website").value != "") {
      socials =
        socials +
        `- [Website](https://tele.tv/${
          document.getElementById("website").value
        })\n`;
    }
    setIsVisible(true);
  }
  return (
    <>
      {isVisible ? (
        <TechStack back={() => setIsVisible(false)} />
      ) : (
        <div className="fade-on-appear flex flex-col items-center">
          <Header back={back}>
            <p className="text-2xl md:text-3xl">Add Your Social Links</p>
          </Header>

          <div className="my-10 flex w-full flex-wrap justify-between md:w-8/12">
            <TextInputWithIcon id="linkedin" placeholder="LinkedIn Username">
              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
            </TextInputWithIcon>
            <TextInputWithIcon id="telegram" placeholder="Telegram Username">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.1117 4.49449C23.4296 2.94472 21.9074 1.65683 20.4317 2.227L2.3425 9.21601C0.694517 9.85273 0.621087 12.1572 2.22518 12.8975L6.1645 14.7157L8.03849 21.2746C8.13583 21.6153 8.40618 21.8791 8.74917 21.968C9.09216 22.0568 9.45658 21.9576 9.70712 21.707L12.5938 18.8203L16.6375 21.8531C17.8113 22.7334 19.5019 22.0922 19.7967 20.6549L23.1117 4.49449ZM3.0633 11.0816L21.1525 4.0926L17.8375 20.2531L13.1 16.6999C12.7019 16.4013 12.1448 16.4409 11.7929 16.7928L10.5565 18.0292L10.928 15.9861L18.2071 8.70703C18.5614 8.35278 18.5988 7.79106 18.2947 7.39293C17.9906 6.99479 17.4389 6.88312 17.0039 7.13168L6.95124 12.876L3.0633 11.0816ZM8.17695 14.4791L8.78333 16.6015L9.01614 15.321C9.05253 15.1209 9.14908 14.9366 9.29291 14.7928L11.5128 12.573L8.17695 14.4791Z"
                fill="#0F0F0F"
              />
            </TextInputWithIcon>
            <TextInputWithIcon id="x" placeholder="X Username">
              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
            </TextInputWithIcon>
            <TextInputWithIcon id="website" placeholder="Website">
              <path d="M10,17.55,8.23,19.27a2.47,2.47,0,0,1-3.5-3.5l4.54-4.55a2.46,2.46,0,0,1,3.39-.09l.12.1a1,1,0,0,0,1.4-1.43A2.75,2.75,0,0,0,14,9.59a4.46,4.46,0,0,0-6.09.22L3.31,14.36a4.48,4.48,0,0,0,6.33,6.33L11.37,19A1,1,0,0,0,10,17.55ZM20.69,3.31a4.49,4.49,0,0,0-6.33,0L12.63,5A1,1,0,0,0,14,6.45l1.73-1.72a2.47,2.47,0,0,1,3.5,3.5l-4.54,4.55a2.46,2.46,0,0,1-3.39.09l-.12-.1a1,1,0,0,0-1.4,1.43,2.75,2.75,0,0,0,.23.21,4.47,4.47,0,0,0,6.09-.22l4.55-4.55A4.49,4.49,0,0,0,20.69,3.31Z" />
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
