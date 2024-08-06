import { fetchGraphQL } from "@/contentful/api";
import { featuredSectionQuery } from "@/contentful/gql-queries/components/featured-section";
import { FeaturedSectionResponseData } from "@/types";
import { PossibleComponentType } from "@/types/page.type";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import Link from "next/link";
import SectionContainer from "../containers/section-container";

async function getFeaturedSection(id: string) {
  try {
    const res = await fetchGraphQL<FeaturedSectionResponseData>(
      featuredSectionQuery(id),
      60,
      ["featuredSection"]
    );

    if (!res.data) throw new Error("Could not locate featured section data");

    return res.data.featuredSection;
  } catch (error) {
    console.error("Error fetching featured section data:", error);
    return null;
  }
}

export default async function FeaturedSection(props: PossibleComponentType) {
  const featuredSection = await getFeaturedSection(props.sys.id);
  if (!featuredSection) return null;

  return (
    <SectionContainer>
      <div
        className={`flex flex-col w-full items-center ${
          featuredSection.alignText === "left"
            ? "md:flex-row-reverse"
            : "md:flex-row"
        }`}
      >
        {featuredSection.imageSize === "full" && featuredSection.image && (
          <div className='relative w-full h-[50vh] md:h-[70vh]'>
            <Image
              src={featuredSection.image.url}
              alt={featuredSection.image.title}
              layout='fill'
              className='object-center object-cover'
            />
          </div>
        )}
        {featuredSection.imageSize === "half" && featuredSection.image && (
          <div className={`w-full md:w-1/2`}>
            <div className='relative h-[50vh] md:h-[70vh] w-full'>
              <Image
                src={featuredSection.image.url}
                alt={featuredSection.image.title}
                layout='fill'
                className='object-center object-cover'
              />
            </div>
          </div>
        )}
        <div
          className={`w-full md:w-1/2 flex flex-col p-4 md:p-16 justify-center`}
        >
          {featuredSection.preHeading && (
            <div>
              <h3 className='font-garamond text-sm dark:text-gray-400 text-gray-400'>
                {featuredSection.preHeading}
              </h3>
            </div>
          )}
          <div>
            <h2 className='font-garamond font-bold text-4xl text-gray-500 dark:text-gray-500'>
              {featuredSection.heading}
            </h2>
          </div>
          <span className='h-2 w-24 bg-primary my-4' />
          <div className='max-w-lg'>
            {documentToReactComponents(featuredSection.text.json)}
          </div>
          {featuredSection.ctaText && featuredSection.ctaPage && (
            <div className='mt-8'>
              <Link
                href={featuredSection.ctaPage.slug}
                className='text-gray-500 font-sans uppercase border-2 border-primary py-2 px-4 hover:bg-primary hover:text-white transition-colors'
              >
                {featuredSection.ctaText}
              </Link>
            </div>
          )}
        </div>
      </div>
    </SectionContainer>
  );
}
