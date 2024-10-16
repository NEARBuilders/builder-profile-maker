import React from "react";

export default function Credits() {
  const cc = [
    {
      avatar: "https://avatars.githubusercontent.com/u/81325730?v=4",
      name: "Vishwa Gaurav",
      creditfor: "Visit Count Pro"
    },
    {
      avatar: "https://avatars.githubusercontent.com/u/35374649?v=4",
      name: "Anurag Hazra",
      creditfor: "GitHub ReadMe Stats"
    },
    {
      avatar: "https://avatars.githubusercontent.com/u/20955511?v=4",
      name: "Jonah Lawrence",
      creditfor: "GitHub ReadMe Streaks"
    },
    {
      avatar: "https://avatars.githubusercontent.com/u/81325730?v=4",
      name: "Vishwa Gaurav",
      creditfor: "Random Memes"
    },
    {
      avatar: "https://avatars.githubusercontent.com/u/6661165?v=4",
      name: "Ryota Sakamoto",
      creditfor: "GitHub Profile Trophies"
    },
    {
      avatar: "https://avatars.githubusercontent.com/u/32237558?v=4",
      name: "Piyush Suthar",
      creditfor: "GitHub ReadMe Quotes"
    }
  ];
  return (
    <div className="my-10 flex w-full flex-col items-center text-green-300 md:my-14">
      <p className="text-4xl font-semibold">Credits</p>
      <p className="my-4 w-full text-center text-xl text-gray-500 md:w-8/12">
        We believe in giving credit where it&apos;s due. To all the OG creators,
        we see you and #thank you for creating these awesome tools!
      </p>
      <div className="w-max-[90vw] w-full overflow-x-auto md:w-8/12">
        <div className="flex w-max flex-row flex-wrap">
          {/* Card */}
          {cc.map((cc, index) => (
            <div
              key={index}
              className="m-2 flex w-56 flex-col items-center rounded-md p-4 py-10 brightness-90"
            >
              <img
                src={cc.avatar}
                alt=""
                className="h-20 w-20 rounded-full md:h-28 md:w-28"
              />
              <p className="mt-2 text-lg font-medium opacity-75">{cc.name}</p>
              <p className="text-zinc-500">{cc.creditfor}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
