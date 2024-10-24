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
          <div className="relative flex w-full flex-col items-center py-16 md:min-h-[90vh] md:flex-row md:py-28">
            <div className="relative flex w-full flex-col gap-2 md:w-6/12">
              <div className="relative flex w-full items-center gap-1">
                <img
                  src="/logo_bdao.png"
                  alt="logo"
                  className="mr-2 h-36 w-60"
                />
              </div>
              <p className="text-4xl sm:text-6xl md:text-7xl 2xl:text-8xl">
                Profile Builder
              </p>
              {/* Text Input */}
              <div>
                <form className="w-full" onSubmit={onNext}>
                  <div className="mt-8 flex flex-row items-center md:my-8 2xl:my-10">
                    <input
                      type="text"
                      value={input}
                      required={true}
                      onChange={(e) => setInput(e.target.value)}
                      autoFocus={true}
                      className="text-md inline w-full rounded-full border-2 border-orange-400 bg-transparent p-2 px-4 py-3 outline-none transition-all duration-75 focus:border-orange-500 sm:w-11/12 sm:text-3xl md:w-10/12 md:text-xl lg:w-8/12 lg:text-xl 2xl:text-3xl"
                      placeholder="Enter Your GitHub Username"
                    />
                    <button
                      type="Submit"
                      className="mx-2 rounded-full border-2 border-white px-0 py-2 text-lg transition-all duration-300 hover:bg-white hover:text-black hover:shadow-[0px_0px_15px_0px_rgba(0,0,0,0.3)] hover:shadow-white sm:px-1 sm:py-3"
                    >
                      <RIGHT_ARROW_SVG />
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="mt-20 flex w-7/12 justify-center md:mt-0 md:w-6/12">
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
