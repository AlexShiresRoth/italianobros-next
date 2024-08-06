"use client";

import { useContext } from "react";
import { HeaderContext } from "../header-context";

export default function MobileNavController() {
  return (
    <div>
      <HamburgerMenu />
    </div>
  );
}

const HamburgerMenu = () => {
  const { setMobileMenuToggled, mobileMenuToggled, setToggled } =
    useContext(HeaderContext);

  const toggleMenu = () => {
    setMobileMenuToggled(!mobileMenuToggled);
    setToggled(false);
  };

  return (
    <div className='relative'>
      <button
        onClick={toggleMenu}
        className='relative flex flex-col items-center justify-center w-10 h-10  text-primary rounded-md focus:outline-none'
      >
        <span
          className={`block w-6 h-0.5 bg-primary  transform transition-transform duration-300 ${
            mobileMenuToggled ? "translate-y-1 rotate-45" : ""
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-primary my-1 transition-opacity duration-300 ${
            mobileMenuToggled ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block w-6 h-0.5 bg-primary  transform transition-transform duration-300 ${
            mobileMenuToggled ? "-translate-y-2 -rotate-45" : ""
          }`}
        />
      </button>
    </div>
  );
};
