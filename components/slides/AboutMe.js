/* eslint-disable @next/next/no-img-element */
import { useObserver } from "mobx-react";
import React, { useState } from "react";
import { useProfileMaker } from "../../contexts/profile-maker";
import NextButton from "../elements/buttons/NextButton";
import Pagination from "../elements/Pagination";
import GitHubStats from "./GitHubCards";

import { UploadDropzone } from "../../utils/uploadthing";
import Header from "../elements/header";
import { BULB_SVG } from "../elements/SVG";

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

  const [isGenerating, setIsGenerating] = useState(false);

  const textareaPlaceholder = `🔭 I'm currently working on
👯 I'm looking to collaborate on
🤝 I'm looking for help with
🌱 I'm currently learning
💬 Ask me about
⚡ Fun fact`;

  async function generateProfile() {
    setIsGenerating(true);
    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: `${aboutme} ${name ? `and my name is ${name}` : ""}`
      })
    });
    const data = await response.json();
    setIsGenerating(false);
    setAboutme(data);
  }

  function onNext() {
    if (
      aboutme != `` &&
      name != `` &&
      profileImage != `` &&
      backgroundImage != ``
    ) {
      profileMaker.data.aboutme = aboutme;
      profileMaker.data.name = name;
      profileMaker.data.profileImage = profileImage?.url;
      profileMaker.data.backgroundImage = backgroundImage?.url;
    }
    setIsVisible(true);
  }

  return useObserver(() => (
    <>
      {isVisible ? (
        <GitHubStats back={() => setIsVisible(false)} />
      ) : (
        <div className="fade-on-appear flex flex-col items-center">
          {/* <button
            className="absolute left-0 m-5 opacity-80 outline-none transition-all ease-in-out hover:opacity-100 md:m-10"
            onClick={back}
          >
            ◄ Go Back
          </button>
          <p className="my-6 mt-20 w-full text-center text-2xl md:my-10 md:text-3xl">
            Add a small introduction
          </p>
           */}
          <Header back={back}>
            <p className="text-2xl md:text-3xl">Add a small introduction</p>
          </Header>
          <div className="flex w-full flex-col md:flex-row">
            <div className="mb-4 flex w-full items-center justify-center md:mb-0 md:w-6/12">
              <img
                src="/hpill.svg"
                alt=""
                className="pointer-events-none aspect-square w-8/12 select-none"
                draggable="false"
              />
            </div>
            <div className="flex w-full flex-col items-center md:w-6/12">
              <div className="mx-auto w-full max-w-2xl space-y-6 p-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-xl font-medium text-orange-500"
                  >
                    What should we call you?
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full rounded-md border-2 border-orange-500 bg-transparent p-2 outline-none focus:border-white"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Profile Image Upload */}
                <div className="grid w-full place-items-center gap-4 md:grid-cols-2">
                  <div className="flex w-full flex-col items-center gap-2">
                    <label
                      htmlFor="profileImage"
                      className="text-lg font-medium text-orange-500 md:text-xl"
                    >
                      Profile Image
                    </label>
                    <div className="h-full w-full overflow-hidden rounded-md border-2 border-orange-500 hover:border-orange-200">
                      {profileImage ? (
                        <img
                          src={profileImage.url}
                          alt="Profile"
                          className="h-full w-full rounded-md object-cover"
                        />
                      ) : (
                        <div className="cursor-pointer text-center">
                          <UploadDropzone
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                              console.log("File: ", res);
                              setProfileImage(res[0]);
                            }}
                            appearance={{
                              label: {
                                color: "#ECA227"
                              },
                              button: {
                                backgroundColor: "#ECA227"
                              }
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Background Image Upload */}
                  <div className="flex w-full flex-col items-center gap-2">
                    <label
                      htmlFor="backgroundImage"
                      className="text-lg font-medium text-orange-500 md:text-xl"
                    >
                      Background Image
                    </label>
                    <div className="h-full w-full overflow-hidden rounded-md border-2 border-orange-500 hover:border-orange-200">
                      {backgroundImage ? (
                        <img
                          src={backgroundImage.url}
                          alt="Background"
                          className="h-full w-full rounded-md object-cover"
                        />
                      ) : (
                        <div className="cursor-pointer text-center">
                          <UploadDropzone
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                              console.log("Files: ", res);
                              setBackgroundImage(res[0]);
                            }}
                            appearance={{
                              label: {
                                color: "#ECA227"
                              },
                              button: {
                                backgroundColor: "#ECA227"
                              }
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="aboutMe"
                    className="block text-xl font-medium text-orange-500"
                  >
                    Tell us about yourself:
                  </label>
                  <textarea
                    id="aboutMe"
                    className="h-48 w-full resize-none rounded-md border-2 border-orange-500 bg-transparent p-2 outline-none focus:border-white disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder={textareaPlaceholder}
                    value={aboutme}
                    onChange={(e) => setAboutme(e.target.value)}
                    disabled={isGenerating}
                  ></textarea>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    class="opacity-60 hover:opacity-80"
                    title="Load Template"
                    onClick={() => setAboutme(textareaPlaceholder)}
                  >
                    <BULB_SVG />
                  </button>
                  <button
                    disabled={aboutme.length === 0 || isGenerating}
                    onClick={() => generateProfile()}
                    className={`group relative inline-block w-max select-none rounded-lg border-2 border-orange-500 px-3 py-3 font-bold uppercase tracking-widest text-orange-100 sm:px-6 ${aboutme.length === 0 || isGenerating ? "cursor-not-allowed opacity-50" : "hover:border-orange-200"} `}
                  >
                    Generate using ai
                  </button>
                  <NextButton onClick={() => onNext()} />
                </div>
                <small className="ps-8">
                  Cannot generate without giving prompt
                </small>
              </div>
            </div>
          </div>
          <Pagination val={1} />
        </div>
      )}
    </>
  ));
}
