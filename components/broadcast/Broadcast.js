import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Broadcast() {
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  useEffect(() => {
    axios.get("https://itsvg.in/api/broadcast").then((res) => {
      if (res.data.title) {
        setTitle(res.data.title);
        setLink(res.data.link);
        setIsVisible(true);
        setTimeout(() => {
          setIsVisible(false);
        }, 15000);
      }
    });
  }, []);
  return (
    <>
      {isVisible && (
        <div className="h-8">
          <div className="absolute left-0 top-0 flex h-8 w-full items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-xs text-white transition-all ease-in-out sm:text-sm md:text-base">
            <a href={link} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
