import React from "react";

export default function Pagination({ val }) {
  return (
    <div className="fixed bottom-2 left-2 rounded-full bg-green-300 px-6 py-2 font-semibold text-zinc-800">
      {val} / 5
    </div>
  );
}
