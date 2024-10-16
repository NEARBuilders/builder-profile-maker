/* eslint-disable @next/next/no-img-element */
import { useObserver } from "mobx-react";
import React, { useState } from "react";
import { useProfileMaker } from "../../contexts/profile-maker";
import { RIGHT_ARROW_SVG } from "../elements/SVG";
import ToastError from "../elements/toaster/ToastError";
import AboutMe from "./AboutMe";
import { useWallet } from "../../contexts/wallet";

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const profileMaker = useProfileMaker();
  const { signOut } = useWallet();
  const [input, setInput] = useState(profileMaker.data.username);
  function onNext() {
    if (input != "" && input.replace(/ /g, "") != "") {
      profileMaker.data.username = input;
      setIsVisible(true);
      topFunction();
    } else {
      invalidUsername();
    }
  }
  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  function invalidUsername() {
    if (alertVisible !== true) {
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 4400);
    }
  }

  return useObserver(() => (
    <>
      {isVisible ? (
        <AboutMe back={() => setIsVisible(false)} />
      ) : (
        <div className="scroll-smooth">
          <div className="relative flex min-h-[90vh] w-full flex-col items-center py-16 md:flex-row md:py-28">
            <div className="relative flex w-full flex-col gap-2 md:w-6/12">
              <div className="relative flex w-full items-center gap-1">
                <img
                  src="/logo_bdao.png"
                  alt="logo"
                  className="mr-2 h-36 w-60"
                />
              </div>
              <p className="text-6xl md:text-7xl 2xl:text-8xl">
                Profile Builder
              </p>
              {/* Text Input */}
              <div className="2xl:my10 mt-8 flex flex-col items-center sm:flex-row md:my-8">
                <form className="w-full" onSubmit={onNext}>
                  <input
                    type="text"
                    value={input}
                    required={true}
                    onChange={(e) => setInput(e.target.value)}
                    autoFocus={true}
                    className="focus:border-border-[#ECA227] inline w-full border-b-2 border-[#ECA227] bg-transparent text-xl outline-none focus:border-b-4 sm:w-11/12 sm:text-3xl md:w-10/12 md:text-xl lg:w-8/12 lg:text-2xl 2xl:text-3xl"
                    placeholder="Enter Your GitHub Username"
                  />
                  <button type="Submit">
                    <RIGHT_ARROW_SVG />
                  </button>
                </form>
              </div>
            </div>
            <div className="mt-16 flex w-full justify-center md:mt-0 md:w-6/12">
              <img
                src="/hat_logo.png"
                alt=""
                className="pointer-events-none w-full rotate-3 animate-bounce select-none sm:w-8/12"
                draggable="false"
              />
            </div>
          </div>
          {alertVisible && (
            <ToastError title="Enter a Valid GitHub Username !" />
          )}
        </div>
      )}
    </>
  ));
}
