import { fetchGraphQL } from "@/contentful/api";
import { headerQuery } from "@/contentful/gql-queries/components/header/header.query";
import { cn } from "@/lib/utils";
import { UnknownComponent } from "@/types/component";
import { NavigationData } from "@/types/nav";
import Image from "next/image";
import Link from "next/link";
import Nav from "../navigation/nav";
import MobileMenu from "../navigation/small-screen-nav";
import Contact from "./custom/contact";
import ContactController from "./custom/contact-controller";
import MobileContactController from "./custom/mobile-contact-controller";
import MobileNavController from "./custom/mobile-nav-controller";
import { HeaderProvider } from "./header-context";

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
    <HeaderProvider>
      <div className='relative' id='mobile-toast-container'>
        <div className='flex flex-col w-full fixed top-0 left-0 z-40 md:relative'>
          <header
            className='w-full flex flex-col items-center md:py-3 bg-white relative'
            data-component-type='header'
          >
            <div className='grid grid-cols-3 w-full py-2 md:py-0 px-8 lg:px-0 md:w-11/12 lg:w-3/4 gap-8 items-center justify-between'>
              <div className='md:block hidden'>
                <Nav
                  actionItemsCollection={header.actionItemsCollection}
                  navItemsCollection={header.navItemsCollection}
                  slug={slug}
                />
              </div>
              <div className='block md:hidden'>
                <MobileNavController />
              </div>
              <div className='flex flex-col md:flex-row md:flex-wrap items-center justify-center'>
                <HeaderLogo logo={header.logo} title={header.title} />
              </div>
              <div className='hidden md:flex items-center justify-end'>
                <ContactController />
              </div>
            </div>
            <MobileContactController />
            <MobileMenu
              actionItemsCollection={header.actionItemsCollection}
              navItemsCollection={header.navItemsCollection}
              slug={slug}
            />
          </header>
          <Contact />
        </div>
      </div>
    </HeaderProvider>
  );
}

const LogoClassNamesBase = `relative z-10 text-2xl md:text-2xl text-black before:h-3 before:rounded-full before:w-[105%] before:block before:content-[' '] before:bg-indigo-500 before:absolute before:skew-y-1 before:-left-[7px] before:bottom-[2px] before:-z-10`;
const LogoClassNamesDarkMode = `dark:text-white`;

const HeaderLogo = ({ logo, title }: Pick<Header, "logo" | "title">) => (
  <Link href={"/"} className='flex items-center'>
    {logo && <Image src={logo.url} alt={logo.title} width={150} height={70} />}
    {!logo && (
      <h2 className={cn([LogoClassNamesBase, LogoClassNamesDarkMode])}>
        {title}
      </h2>
    )}
  </Link>
);
