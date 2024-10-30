/* eslint-disable @next/next/no-img-element */
import { useObserver } from "mobx-react";
import React, { useState } from "react";
import { useProfileMaker } from "../../contexts/profile-maker";
import { RIGHT_ARROW_SVG } from "../elements/SVG";
import ToastError from "../elements/toaster/ToastError";
import AboutMe from "./AboutMe";
import { useWallet } from "../../contexts/wallet";
import { useEffect } from "react";

const LogOut = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      class="lucide lucide-log-out size-[14px] md:size-[16px]"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
};

const LogIn = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      class="lucide lucide-log-in size-[14px] md:size-[16px]"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </svg>
  );
};

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const profileMaker = useProfileMaker();
  const wallet = useWallet();
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

  // useEffect(() => {
  //   if (!initialSignIn && signedAccountId) {
  //     window.location.reload();
  //   }
  // }, [initialSignIn, signedAccountId]);

  return useObserver(() => (
    <>
      {wallet.signedAccountId ? (
        <div className="absolute right-4 top-8 z-50 inline-flex translate-y-1/2 gap-2 rounded-full border px-2 py-1 text-sm md:top-12 md:px-4 md:py-2">
          {wallet.signedAccountId}{" "}
          <button
            onClick={() => {
              wallet.signOut();
            }}
          >
            <LogOut />
          </button>
        </div>
      ) : (
        <div
          onClick={() => wallet.signIn()}
          className="absolute right-4 top-8 z-50 inline-flex translate-y-1/2 cursor-pointer gap-2 rounded-full border px-2 py-1 text-sm md:top-12 md:px-4 md:py-2"
        >
          Log In to NEAR Wallet
          <button>
            <LogIn />
          </button>
        </div>
      )}
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
                  className="pointer-events-none mr-2 h-36 w-60"
                />
              </div>
              <p className="text-4xl sm:text-6xl md:text-7xl 2xl:text-8xl">
                Profile Builder
              </p>
              {/* Text Input */}
              <div>
                <form className="w-full" onSubmit={onNext}>
                  <div className="mt-8 flex flex-row items-center md:mb-4 md:mt-8 2xl:mt-10">
                    <input
                      type="text"
                      value={input}
                      required={true}
                      disabled={wallet.signedAccountId ? false : true}
                      onChange={(e) => {
                        setInput(e.target.value);
                      }}
                      autoFocus={true}
                      className="text-md inline w-full rounded-full border-2 border-orange-400 bg-transparent p-2 px-4 py-3 outline-none transition-all duration-75 focus:border-orange-500 disabled:cursor-not-allowed disabled:opacity-50 sm:w-11/12 sm:text-3xl md:w-10/12 md:text-xl lg:w-8/12 lg:text-xl 2xl:text-3xl"
                      placeholder="Enter Your GitHub Username"
                    />
                    <button
                      type="Submit"
                      disabled={wallet.signedAccountId ? false : true}
                      className="mx-2 rounded-full border-2 border-white px-0 py-2 text-lg transition-all duration-300 hover:bg-white hover:text-black hover:shadow-[0px_0px_15px_0px_rgba(0,0,0,0.3)] hover:shadow-white disabled:cursor-not-allowed disabled:opacity-50 sm:px-1 sm:py-3"
                    >
                      <RIGHT_ARROW_SVG />
                    </button>
                  </div>
                  {!wallet.signedAccountId && (
                    <p
                      className="cursor-pointer text-sm underline"
                      onClick={() => wallet.signIn()}
                    >
                      Login to NEAR Wallet in order to continue
                    </p>
                  )}
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
