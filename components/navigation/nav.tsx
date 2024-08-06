import { NavigationData } from "@/types/nav";
import NavItems from "./nav-items";

type NavProps = NavigationData & { slug?: string };

const Nav = ({ navItemsCollection, slug }: NavProps) => {
  return (
    <>
      <nav className='justify-center flex'>
        <div className='w-full flex items-center py-2'>
          <NavItems navItemsCollection={navItemsCollection} slug={slug} />
        </div>
      </nav>
    </>
  );
};

export default Nav;
