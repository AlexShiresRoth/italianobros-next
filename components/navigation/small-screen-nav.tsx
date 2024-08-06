"use client";
import { NavigationData } from "@/types/nav";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useContext } from "react";
import { HeaderContext } from "../header/header-context";
import NavItems from "./nav-items";

type Props = NavigationData & { slug?: string };

const MobileMenu = ({ navItemsCollection, slug }: Props) => {
  const { mobileMenuToggled } = useContext(HeaderContext);
  return (
    <AnimatePresence>
      {mobileMenuToggled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='w-full bg-slate-100'
        >
          <div
            id='mobile-menu'
            className={`md:hidden flex-col w-full mt-4 relative`}
          >
            <div className='flex flex-col items-center justify-center flex-1 my-10'>
              <NavItems navItemsCollection={navItemsCollection} slug={slug} />
            </div>
            <div className='flex flex-row justify-center items-center w-full py-2'>
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
