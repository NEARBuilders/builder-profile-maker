import { SearchIcon } from "@heroicons/react/outline";
import { useObserver } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useProfileMaker } from "../../contexts/profile-maker";
import { data } from "../../data/tech";
import { searchFilter } from "../../utils/searchFilter";
import NextButton from "../elements/buttons/NextButton";
import Pagination from "../elements/Pagination";
import TechBadgesWrapper from "../techstack/TechBadgesWrapper";
import Preview from "./Preview";
import { socials } from "./Socials";
import { githubstats } from "./GitHubCards";
import Header from "../elements/header";

export default function TechStack({ back }) {
  const [isVisible, setIsVisible] = useState(false);
  const profileMaker = useProfileMaker();
  const [badgeStyle, setBadgeStyle] = useState(profileMaker.data.badge_theme);
  const [techData, setTechData] = useState(data);
  const [searchStr, setSearchStr] = useState("");

  useEffect(() => {
    profileMaker.data.badge_theme = badgeStyle;
  }, [badgeStyle]);

  // Seaching whenever searchStr is changed
  useEffect(() => {
    setTechData(searchFilter(searchStr));
  }, [searchStr]);

  // It is just a message that will appear under a category if no matching tech is found
  const nothingFound = () => {
    return (
      <p className="my-10 text-red-300 opacity-60">
        Oops! no result found for your search.
      </p>
    );
  };

  function onNext() {
    createFinalData();
    setIsVisible(true);
  }

  function createFinalData() {
    var finaldata = "";
    if (profileMaker.data.aboutme != ``) {
      finaldata =
        finaldata +
        `# 💫 About Me:
${profileMaker.data.aboutme.replace(/(?:\r\n|\r|\n)/g, "\n")}

`;
    }
    if (socials != ``) {
      finaldata =
        finaldata +
        `
## 🌐 Socials:
${socials}
`;
    }
    if (profileMaker.data.tech != ``) {
      finaldata =
        finaldata +
        `
# 💻 Tech Stack:
- ${profileMaker.data.tech.join(" \n- ")}
`;
    }
    finaldata = finaldata + githubstats;
    finaldata = `${finaldata}
`;
    // <!-- Proudly created with GPRM ( https://gprm.itsvg.in ) -->
    profileMaker.data.finalData = finaldata;
  }

  return useObserver(() => (
    <>
      {isVisible ? (
        <Preview back={() => setIsVisible(false)} />
      ) : (
        // <Donate back={() => setIsVisible(false)} />
        <div className="fade-on-appear flex flex-col items-center">
          <Header back={back}>
            <p className="text-2xl md:text-3xl">Add tech that you use</p>
          </Header>
          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              name=""
              id=""
              value={searchStr}
              className="duration-400 max-w-[92vw] rounded-full bg-transparent p-3 px-6 pr-16 outline-none ring-2 ring-orange-500 transition-all focus:ring-orange-200 sm:max-w-full md:p-4 md:px-8"
              placeholder="Search tech"
              onChange={(e) => setSearchStr(e.target.value)}
            />
            <SearchIcon className="absolute right-4 top-1/2 w-8 -translate-y-1/2" />
          </div>
          {/* Select Badge Type (with preview) */}
          {/* <div className="my-6 flex flex-row flex-wrap items-center justify-center rounded-md border border-orange-300/50 p-2 px-4">
            Theme:
            <select
              id="badgestyle"
              value={
                profileMaker.data.badge_theme
                  ? profileMaker.data.badge_theme
                  : "for-the-badge"
              }
              onChange={() =>
                setBadgeStyle(document.getElementById("badgestyle").value)
              }
              className="w-max bg-transparent px-2 py-1 outline-none"
            >
              <option value="for-the-badge" className="bg-zinc-900">
                For the badge
              </option>
              <option value="flat" className="bg-zinc-900">
                Flat
              </option>
              <option value="flat-square" className="bg-zinc-900">
                Flat Square
              </option>
              <option value="plastic" className="bg-zinc-900">
                Plastic
              </option>
            </select>
            <img
              src={`https://img.shields.io/badge/Preview-1ED760?style=${badgeStyle}&logo=spotify&logoColor=white`}
              alt=""
              className="ml-4 w-max max-w-xs"
            />
          </div> */}
          <div className="flex w-full flex-col md:flex-row">
            <div
              className={`w-full ${
                searchStr ? "hidden" : "flex"
              } items-center justify-center md:w-6/12`}
            >
              <img
                src="/girlonpc.svg"
                alt=""
                className="pointer-events-none aspect-square select-none md:w-8/12"
                draggable="false"
              />
            </div>
            <div
              className={`flex w-full flex-col ${
                searchStr ? "md:w-full" : "md:w-6/12"
              }`}
            >
              {/* NOT USING ANY DATA FILE TO POPULATE BADGES */}
              <div className="flex h-full flex-col items-center justify-center">
                {/* If nothing found in all searches - can be minified */}
                {techData.lang.length === 0 &&
                  techData.database.length === 0 &&
                  techData.design.length === 0 &&
                  techData.frameworks.length === 0 &&
                  techData.hosting.length === 0 &&
                  techData.ml.length === 0 &&
                  techData.others.length === 0 &&
                  techData.servers.length === 0 &&
                  techData.cicdvcs.length === 0 &&
                  nothingFound()}

                {/* Languages */}
                <TechBadgesWrapper
                  label="LANGUAGES"
                  data={techData.lang}
                  defaultVisibleCount={10}
                />
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center text-white">
            {/* Hosting/SaaS */}
            {/* <TechBadgesWrapper label="Hosting/SaaS" data={techData.hosting} /> */}
            {/* FRAMEWORKS, PLATFORMS & LIBRARIES */}
            <TechBadgesWrapper
              label="FRAMEWORKS, PLATFORMS & LIBRARIES"
              data={techData.frameworks}
              defaultVisibleCount={15}
            />
            {/* SERVERS */}
            <TechBadgesWrapper
              label="SERVERS"
              data={techData.servers}
              defaultVisibleCount={15}
            />
            {/* DATABASES / ORM */}
            <TechBadgesWrapper
              label="DATABASES / ORM"
              data={techData.database}
              defaultVisibleCount={15}
            />
            {/* DESIGN */}
            <TechBadgesWrapper
              label="DESIGN"
              data={techData.design}
              defaultVisibleCount={15}
            />
          </div>

          <NextButton onClick={() => onNext()} />
          <Pagination val={4} />
        </div>
      )}
    </>
  ));
}
