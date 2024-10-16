import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { useProfileMaker } from "../../contexts/profile-maker";
import { useWallet } from "../../contexts/wallet";
import ButtonWithSVG from "../elements/buttons/ButtonWithSVG";
import ToastSuccess from "../elements/toaster/ToastSuccess";

export default function Preview({ back }) {
  const [copiedAlertVisible, setCopiedAlertVisible] = useState(false);
  const [downloadAlertVisible, setDownloadAlertVisible] = useState(false);
  const profileMaker = useProfileMaker();
  const { signIn, signOut, signedAccountId } = useWallet();
  var md = require("markdown-it")({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
    quotes: "“”‘’",
    highlight: function (/*str, lang*/) {
      return "";
    }
  });

  useEffect(() => {
    db.collection(profileMaker.data.username).add({
      date: Date(),
      data: profileMaker.data.finalData
    });
    setTimeout(() => {
      document.getElementById("content").innerHTML = md.render(
        profileMaker.data.finalData
      );

      // targeting all the a tags inside the content div
      const links = document?.getElementById("content")?.querySelectorAll("a");
      // Checking if elements exists
      if (links.length > 0) {
        links.forEach((link) => {
          // adding attribute target
          link.setAttribute("target", "_blank");
        });
      }
    }, 300);
  }, []);

  function onCopy() {
    navigator.clipboard.writeText(profileMaker.data.finalData);
    // Alert for Copied
    copied();
  }
  function onDownload() {
    const element = document.createElement("a");
    const file = new Blob([profileMaker.data.finalData], {
      type: "text/plain"
    });
    element.href = URL.createObjectURL(file);
    element.download = "ReadMe.md";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    // Alert for Downloaded
    downloaded();
  }
  function reloadTab() {
    location.reload();
  }
  function copied() {
    if (copiedAlertVisible !== true) {
      setCopiedAlertVisible(true);
      setTimeout(() => {
        setCopiedAlertVisible(false);
      }, 3000);
    }
  }
  function downloaded() {
    if (downloadAlertVisible !== true) {
      setDownloadAlertVisible(true);
      setTimeout(() => {
        setDownloadAlertVisible(false);
      }, 3000);
    }
  }

  function saveToNearSocial() {
    const data = profileMaker.data;
    console.log(data);

    let profileData = {
      name: data.name,
      description: data.aboutme,
      image: {
        url: data.profileImage
      },
      backgroundImage: {
        url: data.backgroundImage
      },
      linktree: {
        behance: data.socials.behance,
        discord: data.socials.discord,
        facebook: data.socials.facebook,
        github: data.username,
        instagram: data.socials.instagram,
        linkedin: data.socials.linkedin,
        mastodon: data.socials.mastodon,
        medium: data.socials.medium,
        pinterest: data.socials.pinterest,
        quora: data.socials.quora,
        reddit: data.socials.reddit,
        sof: data.socials.sof,
        tiktok: data.socials.tiktok,
        twitch: data.socials.twitch,
        twitter: data.socials.x,
        youtube: data.socials.youtube
      }
    };

    return profileData;
  }

  return (
    <div className="flex w-full flex-col items-center">
      <button
        className="absolute left-0 m-10 opacity-80 outline-none transition-all ease-in-out hover:opacity-100"
        onClick={back}
      >
        ◄ Go Back
      </button>
      <p className="my-8 mt-20 w-full text-center text-3xl">
        Your Builder Profile is ready !
      </p>
      <div className="mb-10 flex flex-col md:flex-row">
        <ButtonWithSVG
          title="Create New"
          onClick={() => reloadTab()}
          d={
            "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          }
        />
        {signedAccountId ? (
          <ButtonWithSVG
            title="Save to NEAR Social Profile"
            onClick={() => signOut()}
            d={
              "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            }
          />
        ) : (
          <ButtonWithSVG
            title="Connect NEAR Profile"
            onClick={() => signIn()}
            d={
              "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            }
          />
        )}
      </div>
      <div className="flex">
        <p className="rounded-t-md bg-orange-200 p-1 px-4 text-zinc-800 brightness-75">
          PREVIEW
        </p>
      </div>
      <div
        id="content"
        className="w-full rounded-lg bg-zinc-800 p-3 py-6 text-zinc-100 shadow-xl shadow-orange-200/20 ring-1 ring-orange-200 md:w-8/12"
      ></div>
      <p className="flex h-full flex-col items-center pt-5 text-center text-xl lg:pt-10">
        Hey👋, Can you help us to grow by sharing? <br />
      </p>
      {copiedAlertVisible && <ToastSuccess title="Copied Successfully!" />}
      {downloadAlertVisible && <ToastSuccess title="Download Started!" />}
    </div>
  );
}
