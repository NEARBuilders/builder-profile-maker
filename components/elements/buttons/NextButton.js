import React from "react";

export default function NextButton({ onClick }) {
  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  return (
    <button
      className="group relative inline-block w-max select-none rounded-lg border-2 border-orange-500 px-6 py-3 font-bold uppercase tracking-widest text-orange-100 hover:border-orange-200"
      onClick={() => onClick() & topFunction()}
    >
      Next
    </button>
  );
}
