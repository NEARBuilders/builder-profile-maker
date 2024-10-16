import React from "react";

export default function FeedbackButton() {
  return (
    <a
      href="mailto:itsvgin@gmail.com"
      className="fixed -left-10 bottom-28 hidden rotate-90 rounded-md border border-b-0 bg-zinc-900 p-1 px-3 pb-2 opacity-50 shadow-xl transition-all ease-in-out hover:opacity-100 hover:shadow-green-200 md:flex"
    >
      Feedback
    </a>
  );
}
