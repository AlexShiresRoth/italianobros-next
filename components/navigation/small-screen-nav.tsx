"use client";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { HeaderContext } from "../header/header-context";

const MobileMenu = () => {
  const { mobileMenuToggled } = useContext(HeaderContext);
  return (
    <div
      id='mobile-menu'
      className={`${
        mobileMenuToggled
          ? "h-[80vh] translate-y-0 flex z-0"
          : "h-0 -translate-y-[200vh] z-0"
      } md:hidden flex-col bg-[#fefefe] w-full mt-4 relative transition-all ease-in-out z-0`}
    >
      <div className='flex flex-col items-center justify-center flex-1'>
        <ul className='flex flex-col items-center justify-center my-16'>
          <Link href='/' className='text-primary'>
            text
          </Link>
        </ul>
      </div>
      <div className='flex flex-row justify-center items-center w-full'>
        <a
          href='https://www.facebook.com/italianobros.enterprise/'
          target='_blank'
          rel='noopener noreferrer'
          className='mx-2'
        >
          <Image
            src='https://res.cloudinary.com/snackmanproductions/image/upload/v1568330392/italianobros/icons/Facebook_kcgpqx.png'
            alt='facebook'
            width={32}
            height={32}
            unoptimized
          />
        </a>
        <a
          href='https://www.instagram.com/italianobros.enterprise/'
          target='_blank'
          rel='noopener noreferrer'
          className='mx-2'
        >
          <Image
            src='https://res.cloudinary.com/snackmanproductions/image/upload/v1568330393/italianobros/icons/Instagram_hp37l4.png'
            alt='Instagram'
            width={32}
            height={32}
            unoptimized
          />
        </a>
      </div>
    </div>
  );
};

export default MobileMenu;
