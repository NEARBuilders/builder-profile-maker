import React, { useEffect } from "react";
import { useProfileMaker } from "../../contexts/profile-maker";
import { useWallet } from "../../contexts/wallet";
import { setProfile } from "../../lib/social";
import ButtonWithSVG from "../elements/buttons/ButtonWithSVG";
import Header from "../elements/header";
import { toast } from "react-toastify";

export default function Preview({ back }) {
  const profileMaker = useProfileMaker();
  const { signIn, signOut, wallet, signedAccountId } = useWallet();

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
  }, [md, profileMaker.data.finalData]);

  function saveToNearSocial() {
    try {
      const data = profileMaker.data;

      const tags = {};
      data.tech.forEach((tech) => {
        tags[tech.toLowerCase().replace(" ", "_")] = tech;
      });

      let website = data.socials.website;
      if (
        website &&
        (!website.startsWith("http") || !website.startsWith("https"))
      ) {
        website = `https://${website}`;
      }

      let profileData = {
        name: data.name,
        description: data.finalData,
        image: {
          ipfs_cid: "",
          url: data.profileImage,
          nft: {
            contractId: "",
            tokenId: ""
          }
        },
        backgroundImage: {
          ipfs_cid: "",
          url: data.backgroundImage,
          nft: {
            contractId: "",
            tokenId: ""
          }
        },
        tags,
        linktree: {
          github: data.username,
          telegram: data.socials.telegram,
          linkedin: data.socials.linkedin,
          twitter: data.socials.x,
          website: website
        }
      };

      setProfile(wallet, signedAccountId, profileData);

      return profileData;
    } catch (error) {
      toast.error("Something went wrong while saving to NEAR Social");
    }
  }

  return (
    <div className="flex w-full flex-col items-center">
      {/* <button
        className="absolute left-0 m-5 opacity-80 outline-none transition-all ease-in-out hover:opacity-100 md:m-10"
        onClick={back}
      >
        ◄ Go Back
      </button> */}
      <Header back={back}>
        <p className="text-2xl md:text-3xl">Your Builder Profile is ready!</p>
        <p className="text text-sm">
          Let&apos;s deploy it, do you have an account?
        </p>
      </Header>

      <div className="mb-10 flex flex-col md:flex-row">
        {signedAccountId ? (
          <ButtonWithSVG
            title="Save to NEAR Social Profile"
            onClick={() => saveToNearSocial()}
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
        <ButtonWithSVG
          title="Create New"
          onClick={() => {
            // reload window
            window.location.reload();
          }}
          d={
            "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          }
        />
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
      {/* <p className="flex h-full flex-col items-center pt-5 text-center text-xl lg:pt-10">
        Hey👋, Can you help us to grow by sharing? <br />
      </p> */}
    </div>
  );
}
