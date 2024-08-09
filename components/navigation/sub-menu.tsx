"use client";

import { NavigationData } from "@/types/nav";
import classNames from "classnames";
import Link from "next/link";
import { useState } from "react";

export const SubMenu = ({
  item,
  slug,
}: {
  slug?: string;
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
        href={`${item.groupLink.slug}`}
        className={classNames(
          "flex items-center  hover:text-primary border-b border-b-transparent hover:border-b-primary",
          {
            "text-primary": slug === item.groupLink.slug,
            "text-gray-400": slug !== item.groupLink.slug,
          }
        )}
      >
        {item.groupName}
      </Link>
      {show && (
        <div className='absolute z-10 shadow-lg p-2 bg-white hidden md:flex flex-col top-[100%] min-w-[150px]'>
          {item.featuredPagesCollection?.items.map((page) => {
            return (
              <Link
                href={`${page.slug}${"#"}${page.slug}`}
                key={page.sys.id}
                className={classNames("hover:text-primary transition-all p-2", {
                  "text-primary": slug === page.slug,
                  "text-gray-400": slug !== page.slug,
                })}
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
