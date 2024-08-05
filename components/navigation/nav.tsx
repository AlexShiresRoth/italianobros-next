import { NavigationData } from "@/types/nav";
import classNames from "classnames";
import Link from "next/link";
import { SubMenu } from "./sub-menu";

type NavProps = NavigationData & { slug?: string };

const Nav = ({ actionItemsCollection, navItemsCollection, slug }: NavProps) => {
  return (
    <>
      <nav className='flex justify-center'>
        <div className='w-full flex items-center py-2'>
          <div className='w-full flex items-center gap-4 justify-between'>
            {navItemsCollection.items.map((item) => (
              <div key={item.sys.id}>
                {item.menuItemsCollection.items.map((menuItem) => {
                  return (
                    <div key={menuItem.sys.id}>
                      {menuItem.featuredPagesCollection.items.length === 0 && (
                        <Link
                          href={menuItem.groupLink.slug ?? null}
                          className={classNames(
                            "transition-all font-garamond hover:text-primary hover:border-b-primary border-b border-b-transparent",
                            {
                              "text-primary": slug === menuItem.groupLink.slug,
                              "text-gray-400 dark:text-gray-400":
                                slug !== menuItem.groupLink.slug,
                            }
                          )}
                        >
                          {menuItem.groupName}
                        </Link>
                      )}
                      {menuItem.featuredPagesCollection.items.length > 0 && (
                        <SubMenu item={menuItem} />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </nav>
      {/* <MobileNav navigation={navigation} /> */}
    </>
  );
};

export default Nav;
