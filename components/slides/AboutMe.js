import React, { useEffect, useState } from "react";
import NextButton from "../elements/buttons/NextButton";
import Pagination from "../elements/Pagination";
import { useObserver } from "mobx-react";
import GitHubStats from "./GitHubCards";
import { LightBulbIcon } from "@heroicons/react/outline";
import { useProfileMaker } from "../../contexts/profile-maker";

import { UploadButton } from "../../utils/uploadthing";

export default function AboutMe({ back }) {
  const [isVisible, setIsVisible] = useState(false);
  const profileMaker = useProfileMaker();
  const [aboutme, setAboutme] = useState(profileMaker.data.aboutme);
  const [name, setName] = useState(profileMaker.data.name);
  const [profileImage, setProfileImage] = useState(
    profileMaker.data.profileImage
  );
  const [backgroundImage, setBackgroundImage] = useState(
    profileMaker.data.backgroundImage
  );
  const textareaPlaceholder = `🔭 I’m currently working on
👯 I’m looking to collaborate on
🤝 I’m looking for help with
🌱 I’m currently learning
💬 Ask me about
⚡ Fun fact`;

  function onNext() {
    if (
      aboutme != `` &&
      name != `` &&
      profileImage.url != `` &&
      backgroundImage.url != ``
    ) {
      profileMaker.data.aboutme = aboutme;
      profileMaker.data.name = name;
      profileMaker.data.profileImage = profileImage.url;
      profileMaker.data.backgroundImage = backgroundImage.url;
    }
    setIsVisible(true);
  }
  return useObserver(() => (
    <>
      {isVisible ? (
        <GitHubStats back={() => setIsVisible(false)} />
      ) : (
        <div className="fade-on-appear flex flex-col items-center">
          <button
            className="absolute left-0 m-10 opacity-80 outline-none transition-all ease-in-out hover:opacity-100"
            onClick={back}
          >
            ◄ Go Back
          </button>
          <p className="my-6 mt-20 w-full text-center text-3xl md:my-10">
            Add a small introduction
          </p>
          <div className="flex w-full flex-col justify-center md:flex-row">
            <div className="flex w-full flex-col items-center md:w-6/12">
              <p className="text-4xl font-semibold text-[#ECA227] md:text-5xl">
                Your Name :
              </p>
              <input
                name="name"
                className="my-6 w-full resize-none whitespace-pre rounded-md bg-transparent p-4 text-base outline-none ring-2 ring-[#ECA227] focus:ring-white sm:text-lg md:my-10 md:text-xl"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
              <div className="grid place-items-center gap-4 md:grid-cols-2">
                <div className="flex flex-col items-center gap-2">
                  <p className="text-2xl font-semibold text-[#ECA227]">
                    Profile Image URL:
                  </p>
                  <span className="text-base font-normal text-white">
                    {profileImage.name}
                  </span>
                </div>
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    console.log("File: ", res);
                    setProfileImage(res[0]);
                  }}
                />
                <div className="flex flex-col items-center gap-2">
                  <p className="text-2xl font-semibold text-[#ECA227]">
                    Background Image URL : <span></span>
                  </p>
                  <span className="text-base font-normal text-white">
                    {backgroundImage.name}
                  </span>
                </div>
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    console.log("Files: ", res);
                    setBackgroundImage(res[0]);
                  }}
                />
              </div>
              <p className="text-4xl font-semibold text-[#ECA227] md:text-5xl">
                About Me :
              </p>
              <textarea
                name=""
                id="aboutme"
                className="my-6 h-72 w-full resize-none whitespace-pre rounded-md bg-transparent p-4 text-base outline-none ring-2 ring-[#ECA227] focus:ring-white sm:text-lg md:my-10 md:h-96 md:text-xl"
                placeholder={textareaPlaceholder}
                value={aboutme}
                onChange={(e) => setAboutme(e.target.value)}
              ></textarea>
              <div className="flex">
                <button
                  className="mr-4 opacity-60 hover:opacity-80"
                  title="Load Template"
                  onClick={() => setAboutme(textareaPlaceholder)}
                >
                  <LightBulbIcon className="w-6 stroke-1"></LightBulbIcon>
                </button>
                <NextButton onClick={() => onNext()} />
              </div>
            </div>
          </div>
          <Pagination val={1} />
          {/* <FeedbackButton /> */}
        </div>
      )}
    </>
  ));
}
