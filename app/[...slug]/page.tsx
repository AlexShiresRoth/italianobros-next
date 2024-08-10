import ComponentRenderer from "@/components/rendering/component-renderer";
import { fetchGraphQL } from "@/contentful/api";
import { getAppData } from "@/contentful/gql-queries";
import {
  pageCollectionQuerySlugOnly,
  pageQuery,
} from "@/contentful/gql-queries/components/page/page.query";
import { PageCollectionResponseData } from "@/types/page.type";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateStaticParams() {
  const res = await fetchGraphQL<PageCollectionResponseData>(
    pageCollectionQuerySlugOnly(100, 0)
  );

  if (!res.data?.pageCollection?.items.length) return [];

  return res.data.pageCollection.items.map((page) => ({
    slug: page.slug,
  }));
}

async function getPage(slug: string) {
  try {
    const res = await fetchGraphQL<PageCollectionResponseData>(pageQuery(slug));

    if (!res.data) throw new Error("Could not locate page data");

    return res.data.pageCollection.items[0];
  } catch (error) {
    console.error("Error fetching home data:", error);
    return null;
  }
}

export async function generateMetadata(
  { params: { slug } }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const page = await getPage(slug);

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: page?.seoMetadata?.title || "Page",
    description: page?.seoMetadata?.description || "",
    openGraph: {
      images: [page?.seoMetadata?.image || "", ...previousImages],
      title: page?.seoMetadata?.title,
      description: page?.seoMetadata?.description || "",
    },
  };
}

export default async function Page({
  params: { slug },
}: {
  params: { slug: string[] };
}) {
  const app = await getAppData(process.env.DOMAIN as string);

  if (!app) return null;

  const currentPageSlug = slug[slug.length - 1];

  const page = await getPage(currentPageSlug);

  if (!page) {
    notFound();
  }

  return (
    <>
      <main className='flex flex-col'>
        <div>
          {page.image && (
            <div className='relative w-full h-[40vh] md:h-[60vh]'>
              <Image
                src={page.image.url}
                alt={page.image.title}
                fill
                unoptimized
                className='object-cover object-center w-full h-full'
              />
              <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-20 z-0' />
            </div>
          )}
          {page.heading && (
            <div className='bg-white w-full flex justify-center items-center py-10'>
              <div className='w-3/4 py-10 max-w-5xl text-center -mt-20 bg-white z-10 flex flex-col items-center'>
                <h1 className='text-2xl md:text-5xl text-primary font-semibold uppercase'>
                  {page.heading}
                </h1>
                <div className='max-w-lg'>
                  <p className='mt-4 text-sm font-sans text-gray-500 dark:text-gray-400 text-center'>
                    {page.subHeading}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        {!!page.topSectionCollection.items.length && (
          <ComponentRenderer
            itemsToRender={page?.topSectionCollection?.items}
            slug={currentPageSlug}
          />
        )}

        {!!page.pageContent && (
          <ComponentRenderer
            itemsToRender={[page?.pageContent]}
            slug={currentPageSlug}
          />
        )}

        {!!page.extraSectionCollection.items.length && (
          <ComponentRenderer
            itemsToRender={page.extraSectionCollection?.items}
            slug={currentPageSlug}
          />
        )}
      </main>
    </>
  );
}
