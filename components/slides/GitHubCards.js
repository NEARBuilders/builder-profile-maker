import { useObserver } from "mobx-react";
import React, { useEffect, useState } from "react";
import themes from "../../data/themes";
import FilterButton from "../elements/buttons/FilterButton";
import NextButton from "../elements/buttons/NextButton";
import Pagination from "../elements/Pagination";
import Socials from "./Socials";
import { useProfileMaker } from "../../contexts/profile-maker";
import Header from "../elements/header";

export default function GitHubStats({ back }) {
  const [isVisible, setIsVisible] = useState(false);
  const profileMaker = useProfileMaker();
  const [theme, setTheme] = useState(profileMaker.data.stats.theme);
  const [border, setBorder] = useState(profileMaker.data.stats.border);
  const [includeAll, setIncludeAll] = useState(
    profileMaker.data.stats.lifetime
  );
  const [includePrivate, setIncludePrivate] = useState(
    profileMaker.data.stats.prv
  );
  function onNext() {
    githubstats = `# 📊 GitHub Stats:
![](${document.getElementById("stats").getAttribute("src")})<br/>
`;
    setIsVisible(true);
  }
  useEffect(() => {
    profileMaker.data.stats.theme = theme;
    profileMaker.data.stats.border = border;
    profileMaker.data.stats.lifetime = includeAll;
    profileMaker.data.stats.prv = includePrivate;
  });
  return useObserver(() => (
    <>
      {isVisible ? (
        <Socials back={() => setIsVisible(false)} />
      ) : (
        <div className="fade-on-appear flex flex-col items-center">
          {/* <button
            className="absolute left-0 m-5 opacity-80 outline-none transition-all ease-in-out hover:opacity-100 md:m-10"
            onClick={back}
          >
            ◄ Go Back
          </button>
          <p className="my-10 mt-28 w-full text-center text-2xl sm:mt-20 md:text-3xl">
            Flex your GitHub Stats
          </p> */}
          <Header back={back}>
            <p className="text-2xl md:text-3xl">Flex your GitHub Stats</p>
          </Header>
          {/* Options */}
          <div className="flex flex-wrap items-center justify-center">
            Theme:
            <select
              id="theme"
              value={profileMaker.data.stats.theme}
              onChange={() => setTheme(document.getElementById("theme").value)}
              className="bg-transparent px-2 py-1 outline-none"
            >
              {themes.map((item) => {
                return (
                  <option key={item} value={item} className="bg-zinc-900">
                    {item}
                  </option>
                );
              })}
            </select>
            <FilterButton
              chk={border}
              title="Border"
              onClick={() => setBorder(!border)}
            />
            <FilterButton
              title="Lifetime Commits"
              chk={includeAll}
              onClick={() => setIncludeAll(!includeAll)}
            />
            <FilterButton
              title="Private Commits"
              chk={includePrivate}
              onClick={() => setIncludePrivate(!includePrivate)}
            />
          </div>
          <p className="mt-4 text-orange-300 opacity-90">
            please wait for images to load after changing any values
          </p>
          <div className="flex w-full flex-col flex-wrap justify-center md:my-4 md:w-8/12">
            <img
              className="pointer-events-none m-2 select-none"
              draggable="false"
              id="stats"
              src={`https://github-readme-stats.vercel.app/api?username=${
                profileMaker.data.username
              }&theme=${theme}&hide_border=${!border}&include_all_commits=${includeAll}&count_private=${includePrivate}`}
              alt=""
            />
          </div>
          <NextButton onClick={() => onNext()} />
          <Pagination val={2} />
        </div>
      )}
    </>
  ));
}

export var githubstats = ``;
