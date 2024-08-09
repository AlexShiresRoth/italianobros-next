import { fetchGraphQL } from "@/contentful/api";
import { getAppData, headerQuery } from "@/contentful/gql-queries";
import classNames from "classnames";
import Link from "next/link";
import { HeaderResponseData } from "../header/header";

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

export default async function ServicesNav({ slug }: { slug?: string }) {
  const app = await getAppData(process.env.DOMAIN as string);

  if (!app) return null;

  const header = await getHeaderData(app.header.sys.id);

  if (!header) return null;

  const services = header.navItemsCollection.items.find(
    (item) => item.menuTitle === "Services"
  );

  if (!services) return null;

  const servicesItems = services.menuItemsCollection.items.filter(
    (item) => item.featuredPagesCollection.items.length > 0
  )[0];

  if (!servicesItems) return null;

  const servicesCollection = servicesItems.featuredPagesCollection.items;

  const gridCols = servicesCollection.length;

  const isServicesPage = slug === "services";
  return (
    <div className='w-full flex justify-center items-center'>
      <div
        className={
          "w-11/12 max-w-7xl bg-primary flex items-center justify-center p-4 px-8 gap-4"
        }
      >
        <div
          className={classNames("grid w-full grid-rows-1 gap-2", {
            "grid-cols-1": gridCols === 1,
            "grid-cols-2": gridCols === 2,
            "md:grid-cols-3": gridCols === 3,
            "md:grid-cols-4": gridCols === 4,
            "md:grid-cols-5": gridCols === 5,
          })}
        >
          {servicesCollection.slice(0, 5).map((service, i) => {
            return (
              <Link
                href={`${service.slug}${"#"}${service.slug}`}
                key={service.sys.id}
                id={service.slug}
              >
                <button
                  type='button'
                  className={classNames(
                    "border w-full border-white hover:bg-white hover:text-primary transition-all py-2 px-2 text-center",
                    {
                      "bg-white text-primary":
                        slug === service.slug || (isServicesPage && i === 0),
                      "text-white bg-primary":
                        slug !== service.slug && !(isServicesPage && i === 0),
                    }
                  )}
                >
                  {service.pageName}
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
