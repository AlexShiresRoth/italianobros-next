"use client";

import { NavigationData } from "@/types/nav";
import Link from "next/link";
import { useState } from "react";

export const SubMenu = ({
  item,
}: {
  // TODO - fix this type lol
  item: NavigationData["navItemsCollection"]["items"][number]["menuItemsCollection"]["items"][number];
}) => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <div
      className='relative flex flex-col justify-end'
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Link
        href={item.groupLink.slug}
        className='flex items-center text-gray-400 hover:text-primary border-b border-b-transparent hover:border-b-primary'
      >
        {item.groupName}
      </Link>
      {show && (
        <div className='absolute z-10 shadow-lg p-2 bg-white hidden md:flex flex-col top-[100%] min-w-[150px]'>
          {item.featuredPagesCollection?.items.map((page) => {
            return (
              <Link
                href={page.slug}
                key={page.sys.id}
                className='text-gray-400 hover:text-primary transition-all p-2'
              >
                {page.pageName}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
