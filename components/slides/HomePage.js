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
          <div className="w-full flex flex-col md:flex-row py-16 min-h-[90vh] items-center relative">
            <div className="flex flex-col w-full md:w-6/12 relative">
              <p className="text-6xl md:text-7xl 2xl:text-8xl">
                Builder Profile Creator
              </p>
              {/* Text Input */}
              <div className="flex flex-col sm:flex-row mt-8 md:my-16 2xl:my-20 items-center">
                <form className="w-full" onSubmit={onNext}>
                  <input
                    type="text"
                    value={input}
                    required={true}
                    onChange={(e) => setInput(e.target.value)}
                    autoFocus={true}
                    className="border-b-2 border-[#ECA227] bg-transparent w-full sm:w-11/12 md:w-10/12 lg:w-8/12 text-xl sm:text-3xl md:text-xl lg:text-2xl 2xl:text-3xl outline-none focus:border-border-[#ECA227] focus:border-b-4 inline"
                    placeholder="Enter Your GitHub Username"
                  />
                  <button type="Submit">
                    <RIGHT_ARROW_SVG />
                  </button>
                </form>
              </div>
            </div>
            <div className="flex w-full mt-16 md:mt-0 md:w-6/12 justify-center">
              <img
                src="/hpill.svg"
                alt=""
                className="w-full sm:w-8/12 aspect-square select-none pointer-events-none"
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
