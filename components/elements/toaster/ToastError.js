import React from "react";

export default function ToastError({ title }) {
  return (
    <div className="toast-error fixed left-1/2 top-3 flex w-max max-w-[90vw] -translate-x-1/2 flex-col items-center justify-center rounded-md bg-rose-200 p-2 px-6 text-lg text-rose-900 md:flex-row">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      {title}
    </div>
  );
}
