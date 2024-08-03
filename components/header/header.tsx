import { fetchGraphQL } from "@/contentful/api";
import { headerQuery } from "@/contentful/gql-queries/components/header/header.query";
import { UnknownComponent } from "@/types/component";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Nav from "../navigation/nav";
import { NavigationData } from "@/types/nav";
import { cn } from "@/lib/utils";

type Props = {
  data?: UnknownComponent;
  slug?: string;
};

export interface Header {
  sys: {
    id: string;
    __typename: string;
  };
  logo: {
    url: string;
    title: string;
  };
  title: string;
  actionItemsCollection: NavigationData["actionItemsCollection"];
  navItemsCollection: NavigationData["navItemsCollection"];
}

export interface HeaderResponseData {
  data: {
    header: Header;
  };
}

async function getHeaderData(id: string) {
  try {
    const res = await fetchGraphQL<HeaderResponseData>(headerQuery(id));

    const header = res.data.header;

    return header;
  } catch (error) {
    console.error("Error fetching header data:", error);
    return null;
  }
}

export default async function Header({ data, slug }: Props) {
  if (!data) return null;

  const header = await getHeaderData(data.sys.id);

  if (!header) {
    return null;
  }

  return (
    <div className='flex flex-col w-full fixed top-0 left-0 z-40 md:relative'>
      <header
        className='w-full flex flex-col items-center md:py-2 bg-white border-b border-b-stone-100'
        data-component-type='header'
      >
        <div className='grid grid-cols-3 w-full px-8 lg:px-0 md:w-11/12 lg:w-3/4 gap-8 items-center justify-between'>
          <Nav
            actionItemsCollection={header.actionItemsCollection}
            navItemsCollection={header.navItemsCollection}
            slug={slug}
          />
          <div className='flex flex-col md:flex-row md:flex-wrap items-center justify-center'>
            <HeaderLogo logo={header.logo} title={header.title} />
          </div>
          <div className='flex items-center justify-end'>
            <button className='text-grey-500 dark:text-gray-500 border border-primary py-3 px-10 font-light text-sm font-garamond uppercase'>
              Contact Us
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

const LogoClassNamesBase = `relative z-10 text-2xl md:text-2xl text-black before:h-3 before:rounded-full before:w-[105%] before:block before:content-[' '] before:bg-indigo-500 before:absolute before:skew-y-1 before:-left-[7px] before:bottom-[2px] before:-z-10`;
const LogoClassNamesDarkMode = `dark:text-white`;

const HeaderLogo = ({ logo, title }: Pick<Header, "logo" | "title">) => (
  <Link href={"/"} className='flex items-center'>
    {logo && <Image src={logo.url} alt={logo.title} width={120} height={60} />}
    {!logo && (
      <h2 className={cn([LogoClassNamesBase, LogoClassNamesDarkMode])}>
        {title}
      </h2>
    )}
  </Link>
);
