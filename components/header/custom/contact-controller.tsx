"use client";

import { useContext } from "react";
import { HeaderContext } from "../header-context";

export default function ContactController() {
  const { toggled, setToggled } = useContext(HeaderContext);
  return (
    <>
      <button
        onClick={() => setToggled(!toggled)}
        className='text-grey-500 dark:text-gray-500 border border-primary py-3 px-10 font-light text-sm font-garamond uppercase hover:bg-primary hover:text-white transition-colors'
      >
        {toggled ? "Close" : "Contact Us"}
      </button>
    </>
  );
}
