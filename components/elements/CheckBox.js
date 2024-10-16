import React from "react";
import { useProfileMaker } from "../../contexts/profile-maker";

export default function CheckBox({ id, title }) {
  const profileMaker = useProfileMaker();
  function chk() {
    profileMaker.data.checkbox[id] = document.getElementById(id).checked;
  }
  return (
    <p className="my-2 flex w-max items-center">
      <input
        type="checkbox"
        name=""
        id={id}
        defaultChecked={profileMaker.data.checkbox[id]}
        onChange={chk}
        className="mr-2 h-4 w-4 outline-none"
      />
      {title}
    </p>
  );
}
