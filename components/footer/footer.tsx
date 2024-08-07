import { fetchGraphQL } from "@/contentful/api";
import { footerQuery } from "@/contentful/gql-queries/components/footer/footer.query";
import { UnknownComponent } from "@/types/component";
import type { Footer } from "@/types/footer";
import Image from "next/image";
import Link from "next/link";
import RichTextRender from "../rendering/rich-text-render";

type Props = {
  data: UnknownComponent;
};

interface FooterResponseData {
  data: {
    footer: Footer;
  };
}

async function getFooter(id: string) {
  try {
    const res = await fetchGraphQL<FooterResponseData>(footerQuery(id));

    return res.data.footer;
  } catch (error) {
    console.error("Error fetching footer data:", error);
    return null;
  }
}

const Footer = async ({ data }: Props) => {
  const footerData = await getFooter(data.sys.id);

  if (!footerData) return null;

  return (
    <footer
      className='w-full flex flex-col items-center justify-center bg-[#707070]'
      data-component-type='footer'
    >
      <div className='w-full px-8 md:px-0 md:w-11/12 mx-4 md:mx-0 flex flex-col gap-8 md:flex-row'>
        <div className='w-full flex flex-col gap-8 md:flex-row justify-between py-14'>
          <div className='flex flex-col'>
            {!footerData.logo?.url && (
              <h3 className='font-bold text-white text-uppercase'>
                {footerData.brandName}
              </h3>
            )}

            {footerData?.logo?.url && (
              <Image
                src={footerData.logo.url}
                width={200}
                height={200}
                alt='logo'
              />
            )}

            <p className='text-white/80 mt-6 mb-2'>Follow us on</p>
            <div className='flex gap-2'>
              {footerData.facebookLink && (
                <a
                  title='Facebook Link'
                  href={footerData.facebookLink}
                  className='hover:bg-primary rounded-full transition-colors p-2'
                >
                  <Image
                    src='/fb.svg'
                    width={20}
                    height={20}
                    alt='facebook-logo'
                    unoptimized
                  />
                </a>
              )}
              {footerData.instagramLink && (
                <a
                  title='Instagram Link'
                  href={footerData.instagramLink}
                  className='hover:bg-primary rounded-full transition-colors p-2'
                >
                  <Image
                    src='/instagram-line.svg'
                    width={20}
                    height={20}
                    alt='instagram-logo'
                    unoptimized
                  />
                </a>
              )}
            </div>
          </div>
          {!!footerData.footerColumnsCollection.items.length &&
            footerData.footerColumnsCollection.items.map((column) => {
              return (
                <div key={column.sys.id} className='flex flex-col gap-2'>
                  {column.menuTitle && (
                    <p className='font-semibold text-white text-uppercase mb-2'>
                      {column.menuTitle}
                    </p>
                  )}
                  {column.columnText?.json && (
                    <RichTextRender content={column.columnText} />
                  )}
                  {!!column.menuItemsCollection.items.length &&
                    column.menuItemsCollection.items.map((menuItem) => {
                      return (
                        <div key={menuItem.sys.id}>
                          <Link
                            href={menuItem.groupLink.slug ?? null}
                            className='text-primary text-lg hover:text-white transition-all'
                          >
                            {menuItem.groupName}
                          </Link>
                        </div>
                      );
                    })}
                </div>
              );
            })}
        </div>
      </div>
      <div className='w-full border-t-2 border-primary/10 py-2 flex items-center justify-center'>
        <div className='w-full px-8 md:px-0 md:w-11/12 py-4 md:mx-0 flex justify-between gap-4 md:gap-0 md:items-center flex-col md:flex-row'>
          <p className='text-white/80 text-xs'>
            &copy; {footerData.brandName} All Rights Reserved.
          </p>
          <p className='text-white/80 text-xs'>
            Website Development by {` `}
            <a
              href='https://alexshiresroth.com'
              className='font-bold text-primary'
            >
              Future Forest Apps
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
