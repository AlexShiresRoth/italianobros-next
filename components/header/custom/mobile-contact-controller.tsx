"use client";
import { useContext } from "react";
import { HeaderContext } from "../header-context";

export default function MobileContactController() {
  const { toggled, setToggled, setMobileMenuToggled, mobileMenuToggled } =
    useContext(HeaderContext);
  const handleToggleMenus = () => {
    setToggled(!toggled);
    setMobileMenuToggled(false);
  };
  return (
    <>
      <button
        onClick={() => handleToggleMenus()}
        className='w-full bg-primary flex md:hidden justify-center items-center text-white py-2'
      >
        {toggled ? "Close" : "Contact Us"}
      </button>
    </>
  );
}
